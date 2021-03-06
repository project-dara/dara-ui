import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import useSWR from "swr";
// import { formatEther } from "ethers/util";

const fetcher = (library: any) => (...args: any) => {
  const [method, ...params] = args;
  // console.log("fetcher", args);
  // like provider['getBalance](args)
  return library[method](...params);
};

export const Balance = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR(
    ["getBalance", account, "latest"],
    fetcher(library) // get a function that takes library, but returns a fcn that takes args
  );

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    if (library) {
      library.on("block", () => {
        console.log("update balance...");
        mutate(undefined, true);
      });
      // remove listener when the component is unmounted
      return () => {
        library.removeAllListeners("block");
      };
    }
    // trigger the effect only on component mount
  }, []);

  if (!balance) {
    return <div>...</div>;
  }
  return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>;
};

export default Balance;
