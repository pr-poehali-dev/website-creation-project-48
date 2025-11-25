import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI assistant endpoint for answering user questions
    Args: event with httpMethod, body (question), queryStringParameters
          context with request_id, function_name attributes
    Returns: HTTP response with AI answer
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        question = body_data.get('question', '').strip()
        
        if not question:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Вопрос не может быть пустым'}),
                'isBase64Encoded': False
            }
        
        from openai import OpenAI
        
        api_key = os.environ.get('OPENAI_API_KEY')
        base_url = os.environ.get('OPENAI_BASE_URL', 'https://api.openai.com/v1')
        
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'API ключ OpenAI не настроен'}),
                'isBase64Encoded': False
            }
        
        client = OpenAI(api_key=api_key, base_url=base_url)
        
        system_prompt = """Ты - дружелюбный помощник на Minecraft RolePlay сервере Imunns RolePlay.
Твоя задача - помогать игрокам с вопросами о сервере, правилах, механиках игры.

Информация о сервере:
- Название: Imunns RolePlay
- Тип: Minecraft RolePlay сервер
- Особенности: Уникальные квесты, персонажи, система уровней и достижений
- Есть система кристаллов (внутриигровая валюта)
- Максимальный уровень: 100
- За каждый уровень игроки получают награды в виде кристаллов

Отвечай кратко, по делу, дружелюбно. Используй эмодзи для наглядности.
Если не знаешь точного ответа - честно скажи об этом и предложи обратиться к администрации."""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        answer = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'answer': answer,
                'question': question,
                'request_id': context.request_id
            }),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Некорректный JSON'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }