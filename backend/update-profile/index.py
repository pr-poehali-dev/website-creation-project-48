import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обновление профиля игрока
    Args: event - dict с httpMethod, headers, body
          context - объект с request_id
    Returns: HTTP response с результатом обновления
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
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
    
    body_data = json.loads(event.get('body', '{}'))
    
    conn = None
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        update_fields = []
        params = []
        
        if 'level' in body_data:
            update_fields.append('level = %s')
            params.append(body_data['level'])
        if 'exp' in body_data:
            update_fields.append('exp = %s')
            params.append(body_data['exp'])
        if 'gems' in body_data:
            update_fields.append('gems = %s')
            params.append(body_data['gems'])
        if 'playTimeMinutes' in body_data:
            update_fields.append('play_time_minutes = %s')
            params.append(body_data['playTimeMinutes'])
        if 'avatar' in body_data:
            update_fields.append('avatar = %s')
            params.append(body_data['avatar'])
        if 'bio' in body_data:
            update_fields.append('bio = %s')
            params.append(body_data['bio'])
        if 'kills' in body_data:
            update_fields.append('kills = %s')
            params.append(body_data['kills'])
        if 'deaths' in body_data:
            update_fields.append('deaths = %s')
            params.append(body_data['deaths'])
        if 'quests' in body_data:
            update_fields.append('quests = %s')
            params.append(body_data['quests'])
        if 'achievements' in body_data:
            update_fields.append('achievements = %s')
            params.append(body_data['achievements'])
        
        if not update_fields:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No fields to update'}),
                'isBase64Encoded': False
            }
        
        params.append(int(user_id))
        query = f"""
            UPDATE t_p89978113_website_creation_pro.users 
            SET {', '.join(update_fields)}
            WHERE id = %s
        """
        
        cur.execute(query, params)
        conn.commit()
        cur.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()
