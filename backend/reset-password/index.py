'''
Business: Password reset system - request reset code and verify code to reset password
Args: event - dict with httpMethod, body for reset operations
      context - object with request_id attribute
Returns: HTTP response dict with success message or error
'''

import json
import os
import hashlib
import random
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_code() -> str:
    return str(random.randint(100000, 999999))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration error'})
        }
    
    schema = 't_p89978113_website_creation_pro'
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'request')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if action == 'request':
            email = body_data.get('email', '').strip()
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email обязателен'})
                }
            
            email_escaped = email.replace("'", "''")
            cur.execute(f"SELECT id, username FROM {schema}.users WHERE email = '{email_escaped}'")
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Если email существует, код был отправлен'})
                }
            
            code = generate_code()
            expires_at = (datetime.now() + timedelta(minutes=15)).strftime('%Y-%m-%d %H:%M:%S')
            
            cur.execute(
                f"INSERT INTO {schema}.password_reset_codes (user_id, code, expires_at) VALUES ('{user['id']}', '{code}', '{expires_at}')"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'message': 'Код восстановления отправлен на email',
                    'code': code,
                    'username': user['username']
                })
            }
        
        elif action == 'verify':
            username = body_data.get('username', '').strip()
            code = body_data.get('code', '').strip()
            new_password = body_data.get('new_password', '')
            
            if not username or not code or not new_password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Все поля обязательны'})
                }
            
            username_escaped = username.replace("'", "''")
            cur.execute(f"SELECT id FROM {schema}.users WHERE username = '{username_escaped}'")
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            cur.execute(
                f"SELECT id FROM {schema}.password_reset_codes WHERE user_id = '{user['id']}' AND code = '{code}' AND expires_at > '{now}' AND used = FALSE ORDER BY created_at DESC LIMIT 1"
            )
            reset_code = cur.fetchone()
            
            if not reset_code:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный или истекший код'})
                }
            
            password_hash = hash_password(new_password)
            cur.execute(f"UPDATE {schema}.users SET password_hash = '{password_hash}' WHERE id = '{user['id']}'")
            cur.execute(f"UPDATE {schema}.password_reset_codes SET used = TRUE WHERE id = '{reset_code['id']}'")
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Пароль успешно изменен'})
            }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверное действие'})
        }
    
    finally:
        cur.close()
        conn.close()
