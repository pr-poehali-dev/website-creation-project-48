import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для получения и обновления статистики серверов в реальном времени'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    dsn = os.environ['DATABASE_URL']
    schema = 't_p89978113_website_creation_pro'
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute(f"""
                SELECT server_name, is_online, current_players, max_players, last_updated
                FROM {schema}.server_stats
                ORDER BY server_name
            """)
            
            servers = []
            for row in cur.fetchall():
                servers.append({
                    'serverName': row[0],
                    'isOnline': row[1],
                    'currentPlayers': row[2],
                    'maxPlayers': row[3],
                    'lastUpdated': row[4].isoformat() if row[4] else None
                })
            
            cur.execute(f"""
                SELECT COUNT(DISTINCT username) 
                FROM {schema}.player_sessions 
                WHERE is_active = true
            """)
            total_online = cur.fetchone()[0]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache'
                },
                'body': json.dumps({
                    'servers': servers,
                    'totalOnline': total_online,
                    'timestamp': datetime.now().isoformat()
                })
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            server_name = body.get('serverName')
            is_online = body.get('isOnline')
            current_players = body.get('currentPlayers')
            
            if not server_name:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'serverName required'})
                }
            
            cur.execute(f"""
                UPDATE {schema}.server_stats 
                SET is_online = %s, current_players = %s, last_updated = CURRENT_TIMESTAMP
                WHERE server_name = %s
                RETURNING id
            """, (is_online, current_players, server_name))
            
            if cur.fetchone():
                conn.commit()
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True})
                }
            else:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Server not found'})
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
