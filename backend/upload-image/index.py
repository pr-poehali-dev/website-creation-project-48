import json
import base64
import os
import uuid
from typing import Dict, Any
import boto3
from botocore.exceptions import ClientError

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload image to S3 and return public URL
    Args: event with httpMethod, body containing base64 image data
    Returns: HTTP response with image URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
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
    
    body_data = json.loads(event.get('body', '{}'))
    image_data = body_data.get('image')
    file_extension = body_data.get('extension', 'jpg')
    
    if not image_data:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Image data required'})
        }
    
    try:
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        
        if len(image_bytes) > 10 * 1024 * 1024:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Image too large. Max 10MB'})
            }
        
        s3_key = os.environ.get('AWS_ACCESS_KEY_ID')
        s3_secret = os.environ.get('AWS_SECRET_ACCESS_KEY')
        
        if not s3_key or not s3_secret:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'S3 configuration missing'})
            }
        
        s3_client = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=s3_key,
            aws_secret_access_key=s3_secret
        )
        
        file_name = f"screenshots/{uuid.uuid4()}.{file_extension}"
        
        content_types = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
        }
        content_type = content_types.get(file_extension.lower(), 'image/jpeg')
        
        s3_client.put_object(
            Bucket='files',
            Key=file_name,
            Body=image_bytes,
            ContentType=content_type
        )
        
        public_url = f"https://cdn.poehali.dev/projects/{s3_key}/bucket/{file_name}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'url': public_url,
                'message': 'Image uploaded successfully'
            })
        }
        
    except base64.binascii.Error:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid base64 image data'})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'S3 error: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Upload failed: {str(e)}'})
        }