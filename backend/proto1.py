import os
import boto3
from utils.logger import LogType, log
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)
client = boto3.client('dynamodb', region_name='ap-southeast-1')
table_name = 'TrustFlow'
table = client.Table(table_name)


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/getuserinfo", methods=['GET'])
def get_kyc_info():
    api_endpoint = 'YOUR_API_ENDPOINT'

    try:
        response = requests.get(api_endpoint)
        data = response.json()
        
        user_photo = data.get('user_photo_url')
        user_aid = data.get('user_aid')
        
        # Return user_photo and user_id as JSON response
        return jsonify({'user_photo_url': user_photo, 'user_aid': user_aid})
    
    except Exception as E:
        # Return error message if something went wrong
        log(TAG, LogType.ERROR, "Error while retrieving Events: " + str(E))
        # return jsonify({'error': str(e)}), 500


@app.route('/aid_photo_url/<user_aid>')
def get_aid_photo_url(user_aid):
    try:
        table_name = 'TrustFlow-Aadhaar'
        table = client.Table(table_name)
        # Get item from DynamoDB table based on user_id
        response = table.get_item(
            Key={
                'user_aid': user_aid
            }
        )
        if 'Item' in response:
            aid_photo_url = response['Item']['aid_photo_url']
            return jsonify({'aid_photo_url': aid_photo_url})

        else:
            return jsonify({'error': 'User ID not found'}), 404

    except Exception as E:
        # Return error message if something went wrong
        return jsonify({'error': str(E)}), 500


@app.route('/user_photo/<user_photo_url>')
def get_user_photo(user_photo_url):
    try:
        

    except Exception as E:
        # Return error message if something went wrong
        return jsonify({'error': str(E)}), 500
