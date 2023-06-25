from flask import Flask, render_template
import os
from ultralytics import YOLO
import ipfs_api
import os
import cv2
import numpy as np
from PIL import Image

app = Flask(__name__)

def predict(img_cid):
    model = YOLO("yolov8l.pt")  # load a pretrained model (recommended for training)
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



@app.route('/predict/<img_cid>', methods=['GET'])
def handle_post_request(img_cid):
    print(img_cid)
    predict(img_cid)
    # Example: Return a JSON response
    return {'img_cid': img_cid, 'message': 'POST request received'}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000, debug=True)