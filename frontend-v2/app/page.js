'use client';

import "./globals.css"

import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";


export const metadata = {
    title: 'vision.dev',
    description: 'ETH Waterloo 2023',
  }
  

// let navigate = useNavigate();

export default function Home() {

    // const navigate = useNavigate();
    // const history = useHistory()



    const formHandler = () => {
      console.log("Calling formHandler()")
      window.location.href = "https://www.google.ca";
    }

    // function formHandler() {

    //   // let path = "/home";
    //   // history.push(path);

    //   // navigate("/home")


    //   window.location.href="https://www.google.ca";

    // }

    return (
        <main>

            <div className="vp-full-width flex items-center flex-col vd-heading-home">
                <p className="text-2xl">vision.dev</p>
                <br/>
                <p className="text-sm">AI-enabed image annotation for InterPlanetary File Storage (IPFS).</p>
                <br /> <br /> <br />

                <center><img src="https://raw.githubusercontent.com/TheFloatingString/vision.dev/main/static/icons8-planet-48.png" /></center>
                {/* <br /> */}

            </div>

            <div className="flex items-center flex-col vd-heading-home">
              <form action="http://localhost:8010/api/login_form" method={"POST"}>
                <center><h2 className="text-base leading-7 text-gray-900">User Authentication</h2></center>
                <br />
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Blockchain Identifier" />
                </div>      
                <br/> 
                <center><button onClick={formHandler} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1. Authenticate</button></center>

                <br />

                <center><a href="/home" className="">2. Proceed</a></center>
              </form>
            </div>

        </main>
    )
}