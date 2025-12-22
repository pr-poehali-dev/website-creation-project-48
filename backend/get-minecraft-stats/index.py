import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Получает статистику игрока из Minecraft сервера
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        user_id = event.get('headers', {}).get('X-User-Id')
        if not user_id:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User ID required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute(
            "SELECT minecraft_nickname FROM users WHERE id = %s",
            (int(user_id),)
        )
        result = cur.fetchone()
        
        if not result or not result[0]:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'linked': False,
                    'minecraft_nickname': None
                }),
                'isBase64Encoded': False
            }
        
        minecraft_nickname = result[0]
        
        cur.execute(
            """
            SELECT kills, deaths, balance, playtime_hours
            FROM minecraft_stats
            WHERE player_name = %s
            """,
            (minecraft_nickname,)
        )
        stats = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if stats:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'linked': True,
                    'minecraft_nickname': minecraft_nickname,
                    'kills': stats[0] or 0,
                    'deaths': stats[1] or 0,
                    'balance': stats[2] or 0,
                    'playtime_hours': stats[3] or 0
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'linked': True,
                    'minecraft_nickname': minecraft_nickname,
                    'kills': 0,
                    'deaths': 0,
                    'balance': 0,
                    'playtime_hours': 0
                }),
                'isBase64Encoded': False
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
