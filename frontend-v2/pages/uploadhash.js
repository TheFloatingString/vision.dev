'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Image from 'next/image';

export default function Home() {


  const [imageData, setImageData] = useState(null);

  async function handleForm(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    console.log(data.get("file-upload"));

    console.log(data.get('ipfs_hash'));

    const client_ipfs_hash = data.get("ipfs_hash");

    const res = await fetch("http://localhost:8010/predict/"+client_ipfs_hash);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImageData(imageObjectURL);


    console.log("Clicked submit");
  }

  return (
    <main className="">

    <div class="vd-full-width grid grid-cols-2">
      <div className='vd-col-left flex min-h-screen flex-col items-center'>

      <p className='text-2xl'>vision.dev</p>

      <br/> <br/>


      <form className='flex flex-col items-center' onSubmit={handleForm}>

        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">IPFS Hash</label>
            <div class="mt-2">
              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input type="text" name="ipfs_hash" id="ipfs_hash" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="IPFS Hash" />
              </div>
            </div>


            <br />

            <p className="text-md"> - or -</p>

            <br />

            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                </svg>
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>(Future step) Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            <br/> <br />

        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>


      </form>


      </div>
      <div className='flex min-h-screen flex-col p-24'>

        <img className='vd-result-img' src={imageData} />

        <br />

        <div className='vd-server-caption'>
          <p className='text-sm'>(Future step) Caption text from the server.</p>
        </div>

      </div>
    </div>

    </main>
  )
}
