import React from "react";
import "../styles/index.css";
import {initApp} from '../state/init'
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils";
import Navbar from '../components/Navbar'
initApp();

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment> 
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="flex flex-col items-center">
          <div className="max-w-2xl w-full">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </div>
      </Web3ReactProvider>
      
    </React.Fragment>
  )
}

export default MyApp;
