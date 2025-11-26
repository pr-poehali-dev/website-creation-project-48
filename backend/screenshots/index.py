import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage screenshots - get all, upload new, approve/reject
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with screenshots data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        server_id = params.get('server_id', 'main')
        show_all = params.get('show_all', 'false') == 'true'
        
        if show_all:
            cur.execute(
                "SELECT id, user_id, username, server_id, title, description, image_url, created_at, approved FROM screenshots WHERE server_id = %s ORDER BY created_at DESC",
                (server_id,)
            )
        else:
            cur.execute(
                "SELECT id, user_id, username, server_id, title, description, image_url, created_at FROM screenshots WHERE server_id = %s AND approved = TRUE ORDER BY created_at DESC",
                (server_id,)
            )
        
        screenshots = cur.fetchall()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps([dict(row) for row in screenshots], default=str)
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id')
        username = body_data.get('username')
        server_id = body_data.get('server_id', 'main')
        title = body_data.get('title')
        description = body_data.get('description', '')
        image_url = body_data.get('image_url')
        
        if not all([user_id, username, title, image_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        cur.execute(
            "INSERT INTO screenshots (user_id, username, server_id, title, description, image_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (user_id, username, server_id, title, description, image_url)
        )
        screenshot_id = cur.fetchone()['id']
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'id': screenshot_id, 'message': 'Screenshot uploaded, waiting for approval'})
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        screenshot_id = body_data.get('id')
        approved = body_data.get('approved', False)
        
        if not screenshot_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Screenshot ID required'})
            }
        
        cur.execute(
            "UPDATE screenshots SET approved = %s WHERE id = %s",
            (approved, screenshot_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'message': 'Screenshot status updated'})
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        screenshot_id = params.get('id')
        
        if not screenshot_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Screenshot ID required'})
            }
        
        cur.execute("DELETE FROM screenshots WHERE id = %s", (screenshot_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'message': 'Screenshot deleted'})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
