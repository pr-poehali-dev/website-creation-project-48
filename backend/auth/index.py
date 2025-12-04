'''
Business: User authentication and friends management - login, search users, add friends
Args: event - dict with httpMethod, body/queryParams for auth and friend operations
      context - object with request_id attribute
Returns: HTTP response dict with authentication token or friend data
'''

import json
import os
import hashlib
import secrets
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(stored_hash: str, provided_password: str) -> bool:
    """Проверяет соответствие пароля хешу"""
    try:
        salt, hash_hex = stored_hash.split('$')
        hash_obj = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return hash_obj.hex() == hash_hex
    except:
        return hashlib.sha256(provided_password.encode()).hexdigest() == stored_hash

def generate_token() -> str:
    return secrets.token_urlsafe(32)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration error'})
        }
    
    schema = 't_p89978113_website_creation_pro'
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        action = params.get('action', 'search')
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        try:
            if action == 'search':
                user_id = params.get('user_id')
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'ID пользователя обязателен'})
                    }
                
                cur.execute(f"SELECT id, username, email, created_at FROM {schema}.users WHERE id = '{user_id}'")
                user = cur.fetchone()
                
                if user:
                    result = dict(user)
                    result['created_at'] = str(result['created_at'])
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps(result)
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден'})
                    }
            
            elif action == 'friends':
                user_id = params.get('user_id')
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'ID пользователя обязателен'})
                    }
                
                query = f"""
                    SELECT u.id, u.username, u.email, f.status, f.created_at, 'sent' as direction
                    FROM {schema}.friends f
                    JOIN {schema}.users u ON f.friend_id = u.id
                    WHERE f.user_id = '{user_id}'
                    UNION
                    SELECT u.id, u.username, u.email, f.status, f.created_at, 'received' as direction
                    FROM {schema}.friends f
                    JOIN {schema}.users u ON f.user_id = u.id
                    WHERE f.friend_id = '{user_id}'
                """
                cur.execute(query)
                rows = cur.fetchall()
                
                friends = []
                for row in rows:
                    friend = dict(row)
                    friend['created_at'] = str(friend['created_at'])
                    friends.append(friend)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'friends': friends})
                }
        
        finally:
            cur.close()
            conn.close()
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    schema = 't_p89978113_website_creation_pro'
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if action == 'add_friend':
            user_id = body_data.get('user_id')
            friend_id = body_data.get('friend_id')
            
            if not user_id or not friend_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID пользователей обязательны'})
                }
            
            if user_id == friend_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нельзя добавить себя в друзья'})
                }
            
            cur.execute(
                f"SELECT id FROM {schema}.friends WHERE (user_id = '{user_id}' AND friend_id = '{friend_id}') OR (user_id = '{friend_id}' AND friend_id = '{user_id}')"
            )
            existing = cur.fetchone()
            
            if existing:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Заявка уже отправлена'})
                }
            
            cur.execute(
                f"INSERT INTO {schema}.friends (user_id, friend_id, status) VALUES ('{user_id}', '{friend_id}', 'pending')"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Заявка в друзья отправлена'})
            }
        
        elif action == 'accept_friend':
            user_id = body_data.get('user_id')
            friend_id = body_data.get('friend_id')
            
            if not user_id or not friend_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID пользователей обязательны'})
                }
            
            cur.execute(
                f"UPDATE {schema}.friends SET status = 'accepted', updated_at = CURRENT_TIMESTAMP WHERE user_id = '{friend_id}' AND friend_id = '{user_id}'"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Заявка принята'})
            }
        
        elif action == 'reject_friend':
            user_id = body_data.get('user_id')
            friend_id = body_data.get('friend_id')
            
            if not user_id or not friend_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID пользователей обязательны'})
                }
            
            cur.execute(
                f"UPDATE {schema}.friends SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE user_id = '{friend_id}' AND friend_id = '{user_id}'"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Заявка отклонена'})
            }
        
        username = body_data.get('username', '').strip()
        password = body_data.get('password', '')
        
        if not username or not password:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Никнейм и пароль обязательны'})
            }
        
        username_escaped = username.replace("'", "''")
        cur.execute(f"SELECT id, username, email, password_hash FROM {schema}.users WHERE username = '{username_escaped}'")
        user = cur.fetchone()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный никнейм или пароль'})
            }
        
        if not verify_password(user['password_hash'], password):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный никнейм или пароль'})
            }
        
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cur.execute(
            f"UPDATE {schema}.users SET last_login = '{now}' WHERE id = '{user['id']}'"
        )
        conn.commit()
        
        token = generate_token()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'token': token,
                'username': user['username'],
                'email': user['email'],
                'user_id': user['id']
            })
        }
    
    finally:
        cur.close()
        conn.close()