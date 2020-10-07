import os
import io
import json
import base64
from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app, resources={"*": {"origins": "*"}})
SUCCESS = "1"
ERROR = "0"

images_db = json.loads(open("images.json").read())
liked = {}
unliked = {}

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/next_image')
def next_unfiltered_image():
    images_type = request.args.get('type')
    rule = request.url_root
    if len(images_db) != 0:
        return json.dumps(rule + "image?id=" + next(iter(images_db.keys())))
    return ""

@app.route('/images')
def get_images_path():
    images_type = request.args.get('type')
    rule = request.url_root
    if images_type == "unfiltered":
        return json.dumps([rule + "image?id=" + i for i in iter(images_db.keys())])
    elif images_type == "liked":
        return json.dumps([rule + "image?id=" + i for i in iter(liked.keys())])
    elif images_type == "unliked":
        return json.dumps([rule + "image?id=" + i for i in iter(unliked.keys())])
    return ""

@app.route('/image_action')
def image_action():
    action = request.args.get('action')
    image_id = request.args.get('id')
    if image_id.isdigit() and image_id in images_db:
        if action == "like":
            liked[image_id] = images_db.pop(image_id)
            return SUCCESS
        elif action == "unlike":
            unliked[image_id] = images_db.pop(image_id)
            return SUCCESS
    return ERROR
    
@app.route('/image')
def get_image():
    image_id = request.args.get('id')
    if image_id.isdigit():
        if image_id in images_db.keys():
            img, img_format = images_db[image_id]["image"], images_db[image_id]["format"]
        elif image_id in liked.keys():
            img, img_format = liked[image_id]["image"], liked[image_id]["format"]
        elif image_id in unlikedkeys():
            img, img_format = unliked[image_id]["image"], unliked[image_id]["format"]

        image_binary = base64.b64decode(bytes.fromhex(img))
        return send_file(io.BytesIO(image_binary),
                         mimetype="image/" + img_format)
    return "none"