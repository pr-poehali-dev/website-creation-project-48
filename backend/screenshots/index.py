import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''Управление скриншотами: получение, добавление, модерация'''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # GET - получить скриншоты
        if method == 'GET':
            query_params = event.get('queryStringParameters', {}) or {}
            server_id = query_params.get('server_id')
            status = query_params.get('status', 'approved')
            
            if server_id:
                cur.execute(
                    "SELECT * FROM t_p89978113_website_creation_pro.screenshots WHERE server_id = %s AND status = %s ORDER BY created_at DESC",
                    (server_id, status)
                )
            else:
                cur.execute(
                    "SELECT * FROM t_p89978113_website_creation_pro.screenshots WHERE status = %s ORDER BY created_at DESC",
                    (status,)
                )
            
            screenshots = cur.fetchall()
            
            result = []
            for s in screenshots:
                result.append({
                    'id': s['id'],
                    'username': s['username'],
                    'title': s['title'],
                    'description': s['description'],
                    'image_url': s['image_url'],
                    'server_id': s['server_id'],
                    'status': s['status'],
                    'created_at': s['created_at'].isoformat() if s['created_at'] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        # POST - добавить новый скриншот
        elif method == 'POST':
            body_str = event.get('body', '{}')
            if not body_str or body_str.strip() == '':
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Request body required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(body_str)
            
            user_id = body_data.get('user_id')
            username = body_data.get('username')
            server_id = body_data.get('server_id')
            title = body_data.get('title')
            description = body_data.get('description', '')
            image_url = body_data.get('image_url')
            
            if not all([user_id, username, server_id, title, image_url]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                """INSERT INTO t_p89978113_website_creation_pro.screenshots 
                   (user_id, username, server_id, title, description, image_url, status, created_at)
                   VALUES (%s, %s, %s, %s, %s, %s, 'pending', CURRENT_TIMESTAMP)
                   RETURNING id""",
                (user_id, username, server_id, title, description, image_url)
            )
            
            new_id = cur.fetchone()['id']
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': new_id, 'message': 'Screenshot submitted for moderation'}),
                'isBase64Encoded': False
            }
        
        # PUT - модерация (одобрить/отклонить)
        elif method == 'PUT':
            body_str = event.get('body', '{}')
            if not body_str or body_str.strip() == '':
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Request body required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(body_str)
            
            screenshot_id = body_data.get('screenshot_id')
            new_status = body_data.get('status')
            moderated_by = body_data.get('moderated_by')
            
            if not all([screenshot_id, new_status, moderated_by]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            if new_status not in ['approved', 'rejected']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid status'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                """UPDATE t_p89978113_website_creation_pro.screenshots 
                   SET status = %s, moderated_at = CURRENT_TIMESTAMP, moderated_by = %s
                   WHERE id = %s""",
                (new_status, moderated_by, screenshot_id)
            )
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Screenshot moderated successfully'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        if 'conn' in locals():
            conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        }
