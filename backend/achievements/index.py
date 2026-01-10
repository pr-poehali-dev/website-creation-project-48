import json
import os
import psycopg2
from datetime import datetime

def get_db_connection():
    '''Подключение к базе данных'''
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: dict, context) -> dict:
    '''API для синхронизации достижений игроков с игровым сервером'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            player_nickname = params.get('nickname')
            
            if not player_nickname:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'nickname parameter required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                SELECT achievement_id, unlocked, progress, claimed, unlocked_at, claimed_at
                FROM t_p89978113_website_creation_pro.player_achievements
                WHERE player_nickname = %s
            ''', (player_nickname,))
            
            rows = cur.fetchall()
            achievements = []
            for row in rows:
                achievements.append({
                    'achievement_id': row[0],
                    'unlocked': row[1],
                    'progress': row[2],
                    'claimed': row[3],
                    'unlocked_at': row[4].isoformat() if row[4] else None,
                    'claimed_at': row[5].isoformat() if row[5] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'nickname': player_nickname, 'achievements': achievements}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            player_nickname = body.get('nickname')
            achievement_id = body.get('achievement_id')
            unlocked = body.get('unlocked', False)
            progress = body.get('progress', 0)
            
            if not player_nickname or achievement_id is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'nickname and achievement_id required'}),
                    'isBase64Encoded': False
                }
            
            unlocked_at = datetime.now() if unlocked else None
            
            cur.execute('''
                INSERT INTO t_p89978113_website_creation_pro.player_achievements
                (player_nickname, achievement_id, unlocked, progress, unlocked_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (player_nickname, achievement_id)
                DO UPDATE SET
                    unlocked = EXCLUDED.unlocked,
                    progress = EXCLUDED.progress,
                    unlocked_at = EXCLUDED.unlocked_at,
                    updated_at = EXCLUDED.updated_at
            ''', (player_nickname, achievement_id, unlocked, progress, unlocked_at, datetime.now()))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Achievement updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            player_nickname = body.get('nickname')
            achievement_id = body.get('achievement_id')
            claimed = body.get('claimed', True)
            
            if not player_nickname or achievement_id is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'nickname and achievement_id required'}),
                    'isBase64Encoded': False
                }
            
            claimed_at = datetime.now() if claimed else None
            
            cur.execute('''
                UPDATE t_p89978113_website_creation_pro.player_achievements
                SET claimed = %s, claimed_at = %s, updated_at = %s
                WHERE player_nickname = %s AND achievement_id = %s
            ''', (claimed, claimed_at, datetime.now(), player_nickname, achievement_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Achievement claimed'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
