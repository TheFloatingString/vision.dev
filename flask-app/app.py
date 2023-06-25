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


app = Flask(__name__)

CORS(app)

model = YOLO("yolov8l.pt")  # load a pretrained model (recommended for training)


def predict(img_cid):
    print(f"predicting on image: {img_cid}")
    ipfs_api.download(img_cid, 'input.png')
    results = model("input.png")  # predict on an image

    # Get the image as a numpy array in BGR format
    img_bgr = results[0].plot()

    # Convert the image from BGR to RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

    # Convert the numpy array to a PIL image
    img_pil = Image.fromarray(img_rgb)
    img_pil.save("output.png")


@app.route("/upload_and_predict", methods=["GET", "POST"])
def post_upload_and_predict():

    print(request.form)
    print(request.files.get("file-upload"))

    request.files.get("file-upload").save("input.png")

    results = model("input.png")

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