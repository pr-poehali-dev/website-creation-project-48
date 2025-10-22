import json
from typing import Dict, Any
import socket
import struct

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get Minecraft server status (online players count)
    Args: event - dict with httpMethod, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response with player count
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    server_host = 'forest.s-hub.cloud'
    server_port = 25565
    
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        sock.connect((server_host, server_port))
        
        handshake = b'\x00\x00' + len(server_host).to_bytes(1, 'big') + server_host.encode('utf-8')
        handshake += struct.pack('>H', server_port) + b'\x01'
        handshake = len(handshake).to_bytes(1, 'big') + handshake
        
        sock.sendall(handshake)
        sock.sendall(b'\x01\x00')
        
        sock.recv(1)
        length_bytes = b''
        while True:
            b = sock.recv(1)
            if not b:
                break
            length_bytes += b
            if len(length_bytes) >= 3:
                break
        
        response = sock.recv(4096)
        sock.close()
        
        response_str = response.decode('utf-8', errors='ignore')
        
        if '{' in response_str:
            json_start = response_str.index('{')
            json_data = json.loads(response_str[json_start:])
            
            online = json_data.get('players', {}).get('online', 0)
            max_players = json_data.get('players', {}).get('max', 0)
            version = json_data.get('version', {}).get('name', 'Unknown')
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'online': online,
                    'max': max_players,
                    'version': version,
                    'status': 'online'
                })
            }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'online': 0,
                'max': 0,
                'version': 'Unknown',
                'status': 'offline',
                'error': str(e)
            })
        }
    
    return {
        'statusCode': 500,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Failed to parse server response'})
    }
