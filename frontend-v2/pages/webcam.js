'use client';

import "./globalspages.css"


import Webcam from 'react-webcam';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import Image from 'next/image';
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";

export default function Home() {
        const [img, setImg] = useState(null);
        const [imageData, setImageData] = useState(null);
        const [imageCaption, setImageCaption] = useState(null);
        const webcamRef = useRef(null);

        const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "user",
        };

        const capture = useCallback(async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);

        const formData = new FormData();
        console.log("Here's the img:")
        console.log(imageSrc);
        formData.append('file-upload', imageSrc);

        const resp = await fetch(
            "http://localhost:8010/upload_and_predict", {
                method: "POST",
                body: formData
            }
        )

        const imageBlob = await resp.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageData(imageObjectURL);


        const respCaption = await axios.get("http://localhost:8010/api/output_json")
        console.log(respCaption);
        console.log(respCaption.data);
        console.log(respCaption.data.data.caption);
    
    
        setImageCaption(respCaption.data.data.caption);



        }, [webcamRef]);

        return (

            <div class="vd-full-width grid grid-cols-2">
            <div className='vd-col-left flex min-h-screen flex-col items-center'>
      
            <p className='text-2xl'>vision.dev</p>
      
            <br/> <br/>
      

            <div className="Container">
            {img === null ? (
            <>
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                />
                <br />
                <center><button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={capture}>Capture</button></center>
            </>
            ) : (
            <>
                <img src={img} alt="screenshot" />
                <br />
                <center><button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setImg(null)}>Retake</button></center>
            </>
            )}

            <br/ ><br />

        </div>


          
            </div>
            <div className='flex min-h-screen flex-col p-24'>
      
              <img className='vd-result-img' src={imageData} />
      
              <br />
      
              <div className='vd-server-caption'>
                <p className='text-sm'>{imageCaption}</p>
              </div>
      
            </div>
          </div>
      








        );
    }