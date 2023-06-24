import cv2
import torch
from pathlib import Path
from ultralytics.nn.autobackend import AutoBackend
from ultralytics.yolo.utils.ops import non_max_suppression, scale_boxes
from ultralytics.yolo.data.dataloaders.stream_loaders import LoadImages, LoadStreams
from ultralytics.yolo.utils.plotting import Annotator, colors

# model config
half = False
img_sz = [640, 640]
device = 'cpu'
classes = list(range(80))
conf_thres = 0.5
iou_thres = 0.5
max_det = 1000
line_thickness = 2
agnostic_nms = False

source = './test.mp4'
webcam = source.isnumeric() or source.endswith('.txt')

# output config
show_video = True
save_video = False
output_file_name = 'test_output_1.avi'
out_writter = cv2.VideoWriter(
    output_file_name, 
    cv2.VideoWriter_fourcc('M','J','P','G'), 30, img_sz
)

# load model
# use FP16 half-precision inference, use OpenCV DNN for ONNX inference
model_name = "yolov8n.pt"
model = AutoBackend(model_name, device=device, dnn=False, fp16=half)
stride, names, pt = model.stride, model.names, model.pt

# data loader
if webcam:
    dataset = LoadStreams(
        source, 
        imgsz=img_sz, 
        stride=stride, 
        auto=pt, 
        transforms=getattr(model.model, 'transforms', None), 
        vid_stride=1
    )
    bs = len(dataset)

else:
    dataset = LoadImages(
        source,
        imgsz=img_sz,
        stride=stride,
        auto=pt,
        transforms=getattr(model.model, 'transforms', None),
        vid_stride=1
    )