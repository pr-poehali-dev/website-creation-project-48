import json
import os
import hashlib
import re
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, validator

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Регистрация нового пользователя с проверкой данных и хешированием пароля
    '''
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
    
    try:
        import psycopg2
        
        body_data = json.loads(event.get('body', '{}'))
        username = body_data.get('username', '').strip()
        email = body_data.get('email', '').strip().lower()
        password = body_data.get('password', '')
        
        if not username or len(username) < 3:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Имя пользователя должно быть не менее 3 символов'}),
                'isBase64Encoded': False
            }
        
        if not re.match(r'^[a-zA-Z0-9_-]+$', username):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Имя пользователя может содержать только буквы, цифры, дефис и подчеркивание'}),
                'isBase64Encoded': False
            }
        
        if not email or not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректный email'}),
                'isBase64Encoded': False
            }
        
        if not password or len(password) < 6:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пароль должен быть не менее 6 символов'}),
                'isBase64Encoded': False
            }
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute(
            "SELECT id FROM users WHERE username = %s OR email = %s",
            (username, email)
        )
        existing = cur.fetchone()
        
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 409,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь с таким именем или email уже существует'}),
                'isBase64Encoded': False
            }
        
        cur.execute(
            "INSERT INTO users (username, email, password_hash, created_at) VALUES (%s, %s, %s, NOW()) RETURNING id",
            (username, email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'user_id': user_id,
                'username': username,
                'email': email
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
