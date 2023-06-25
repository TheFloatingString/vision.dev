from flask import Flask, render_template, send_file
from flask import request

import os
from ultralytics import YOLO
import ipfs_api
import os
import cv2
import numpy as np
from PIL import Image

from flask_cors import CORS

import base64
import io
from PIL import Image

# import ipfshttpclient
import ipfsApi


from transformers import pipeline

import json


app = Flask(__name__)

CORS(app)

model = YOLO("yolov8l.pt")  # load a pretrained model (recommended for training)


ipfs_client = ipfsApi.Client("127.0.0.1", 5001)

# ipfs_client = ipfshttpclient.connect()


def generate_image_captions():
    image_to_text = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

    result_text = image_to_text("input.png")

    print(result_text)

    output_dict = {
        "data": {
            "caption": result_text[0]["generated_text"]   
        }
    }

    with open("static/output.json", "w") as jsonfile:
        json.dump(output_dict, jsonfile)

    return result_text


def predict(img_cid):
    print(f"predicting on image: {img_cid}")
    ipfs_api.download(img_cid, 'input.png')
    results = model("input.png")  # predict on an image

    # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>results::")
    # print(results)


    generate_image_captions()

    # Get the image as a numpy array in BGR format
    img_bgr = results[0].plot()

    # Convert the image from BGR to RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

    # Convert the numpy array to a PIL image
    img_pil = Image.fromarray(img_rgb)
    img_pil.save("output.png")


@app.route("/api/output_json", methods=["GET"])
def get_api_output_json():

    with open("static/output.json") as jsonfile:
        data = json.load(jsonfile)
        return data


@app.route("/upload_and_predict", methods=["GET", "POST"])
def post_upload_and_predict():

    print(request.form)

    # print(request.files)

    # print(request.data)

    if request.files.get("file-upload") is not None:
        request.files.get("file-upload").save("pre-input.png")

    else:
        # print(request.form)
        # print(request.form.get("file-upload"))

        string_rep = request.form.get("file-upload").replace("data:image/jpeg;base64,", "")

        img = Image.open(io.BytesIO(base64.decodebytes(bytes(string_rep, "utf-8"))))
        img.save("pre-input.png")


    # save to IPFS
    res = ipfs_client.add("pre-input.png")
    print(res)

    ipfs_api.download(res["Hash"], 'input.png')



    print("Input image saved locally.")

    results = model("input.png")

    # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>results::")
    # print(results)

    generate_image_captions()

    # Get the image as a numpy array in BGR format
    img_bgr = results[0].plot()

    # Convert the image from BGR to RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

    # Convert the numpy array to a PIL image
    img_pil = Image.fromarray(img_rgb)
    img_pil.save("output.png")


    return send_file("output.png", mimetype="image/gif")


@app.route('/predict/<img_cid>', methods=['GET'])
def handle_post_request(img_cid):
    print(img_cid)
    predict(img_cid)
    # Example: Return a JSON response


    # return {'img_cid': img_cid, 'message': 'POST request received'}
    return send_file("output.png", mimetype="image/gif")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8010, debug=True)