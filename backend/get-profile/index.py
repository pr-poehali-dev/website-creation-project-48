import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение профиля игрока
    Args: event - dict с httpMethod, headers
          context - объект с request_id
    Returns: HTTP response с данными профиля
    '''
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
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            SELECT id, username, email, level, exp, gems, play_time_minutes, 
                   avatar, bio, kills, deaths, quests, achievements, created_at
            FROM t_p89978113_website_creation_pro.users 
            WHERE id = %s
        """, (int(user_id),))
        
        row = cur.fetchone()
        
        if not row:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User not found'}),
                'isBase64Encoded': False
            }
        
        hours = row[6] // 60 if row[6] else 0
        minutes = row[6] % 60 if row[6] else 0
        play_time_str = f"{hours} ч {minutes} мин" if hours > 0 else f"{minutes} мин"
        
        profile = {
            'userId': str(row[0]).zfill(6),
            'username': row[1],
            'email': row[2],
            'level': row[3] or 1,
            'exp': row[4] or 0,
            'gems': row[5] or 0,
            'playTime': play_time_str,
            'avatar': row[7] or f"https://api.dicebear.com/7.x/avataaars/svg?seed={row[1]}",
            'bio': row[8] or '',
            'kills': row[9] or 0,
            'deaths': row[10] or 0,
            'quests': row[11] or 0,
            'achievements': row[12] or 0,
            'joinDate': row[13].strftime('%d %B %Y') if row[13] else '',
            'selectedServer': '1'
        }
        
        cur.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(profile),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()
