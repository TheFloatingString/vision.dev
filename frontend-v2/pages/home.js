'use client';

import "./globalspages.css"


export const metadata = {
    title: 'vision.dev',
    description: 'ETH Waterloo 2023',
  }
  

export default function Home() {
    return (
        <main>

            <div className="vp-full-width flex items-center flex-col vd-heading-home">
                <p className="text-2xl">vision.dev</p>
                <br/>
                <p className="text-sm">AI-enabed image annotation for InterPlanetary File Storage (IPFS).</p>
                <br />
            </div>

            <div className="vp-full-width grid grid-cols-3">
                <div className="flex flex-col items-center">
                    <div className="vp-home-col-card">
                        <p>IPFS Hash</p>
                        <br />
                        <center>
                            <img src="https://raw.githubusercontent.com/TheFloatingString/vision.dev/main/static/icons8-search-50.png" />
                        </center>
                        <br />
                        <a href="#" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Query</a>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="vp-home-col-card">
                        <p>File Upload</p>
                        <br />
                        <center>
                            <img src="https://raw.githubusercontent.com/TheFloatingString/vision.dev/main/static/icons8-upload-48.png" />
                        </center>
                        <br />
                        <a href="/uploadfile" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload</a>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="vp-home-col-card">
                        <p>Webcam</p>
                        <br />
                        <center>
                            <img src="https://raw.githubusercontent.com/TheFloatingString/vision.dev/main/static/icons8-compact-camera-50.png" />
                        </center>
                        <br />
                        <a href="/webcam" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Capture</a>
                    </div>
                </div>
            </div>


        </main>
    )
}