import json
import socket
import struct

def get_minecraft_server_status(host: str, port: int) -> dict:
    '''Получение статуса Minecraft сервера через Server List Ping протокол'''
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        sock.connect((host, port))
        
        handshake = b'\x00\x00' + pack_varint(len(host)) + host.encode('utf-8') + struct.pack('>H', port) + b'\x01'
        sock.send(pack_varint(len(handshake)) + handshake)
        
        sock.send(b'\x01\x00')
        
        length = unpack_varint(sock)
        packet_id = unpack_varint(sock)
        
        if packet_id != 0:
            sock.close()
            return {'online': False, 'players': 0, 'max_players': 0, 'version': 'Unknown'}
        
        json_length = unpack_varint(sock)
        json_data = b''
        while len(json_data) < json_length:
            json_data += sock.recv(json_length - len(json_data))
        
        sock.close()
        
        data = json.loads(json_data.decode('utf-8'))
        
        return {
            'online': True,
            'players': data.get('players', {}).get('online', 0),
            'max_players': data.get('players', {}).get('max', 0),
            'version': data.get('version', {}).get('name', 'Unknown')
        }
    
    except Exception as e:
        return {'online': False, 'players': 0, 'max_players': 0, 'version': 'Unknown', 'error': str(e)}

def pack_varint(value: int) -> bytes:
    '''Упаковка числа в VarInt формат'''
    result = b''
    while True:
        temp = value & 0x7F
        value >>= 7
        if value != 0:
            temp |= 0x80
        result += struct.pack('B', temp)
        if value == 0:
            break
    return result

def unpack_varint(sock: socket.socket) -> int:
    '''Распаковка VarInt из сокета'''
    result = 0
    for i in range(5):
        data = sock.recv(1)
        if not data:
            raise Exception('Connection closed')
        byte = struct.unpack('B', data)[0]
        result |= (byte & 0x7F) << (7 * i)
        if not byte & 0x80:
            break
    return result

def handler(event: dict, context) -> dict:
    '''API для получения статуса Minecraft сервера'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        server_ip = '185.9.145.175'
        server_port = 26068
        
        status = get_minecraft_server_status(server_ip, server_port)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(status),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
