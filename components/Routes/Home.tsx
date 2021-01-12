import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import Link from 'next/link'
import useSWR from "swr";
// import Balance from "../../components/Balance";
// import TokenBalance from "../../components/TokenBalance";
import Dara from '../../contracts/artifacts/Dara.json'
// import {addSigner, dara, distributor} from '../../contracts'
import { useWeb3React } from "@web3-react/core";

const daraToken = {
  address: Dara.networks['4'].address,
  symbol: "DARA",
  name: "Dara",
  decimals: 18,
};

const readFetcher = () => (...args) => {
  const [contract, method, ...params] = args;
  return contract[method](...params);
}

export const Home = () => {

  const { account, library } = useWeb3React<Web3Provider>();
  // const { data:totalSupply } = useSWR([dara, 'totalSupply'], readFetcher())
  // const { data:balance } = useSWR([dara, 'balanceOf', account], readFetcher())
  // const { data:capLeft } = useSWR([distributor, 'capLeft'], readFetcher())
  // const { data:round } = useSWR([distributor, 'round'], readFetcher())
  // const { data:rate } = useSWR([distributor, 'rate'], readFetcher())
  
  // const onClick = () => {
  //   // TODO: should get signer when logging in.
  //   addSigner(library.getSigner())
  //   console.log('buy', account, distributor);
  //   distributor.buyTokens(account, {
  //       gasLimit: 100000,
  //     value: "10000000000000000",
  //   })
    
  // };

  return (
    <div className="">
      <div className="m-2 mt-12 text-9xl text-center text-cyan-300 styled-font">
        DARA
      </div>

      <div className="mb-10 text-center text-xl text-cyan-400 font-bold">
        Decentralized DeFi Research
      </div>

      <div className="my-3 text-center">
      <Link href="/crowdfund"><button className=" w-full rounded-md p-2 bg-cyan-500 text-black">CrowdFund</button></Link>
      </div>
      <div className="my-3 text-center">
        <button className="w-full rounded-md p-2 bg-gray-500 text-black">Go to App (Coming Soon)</button>
      </div>

      <div className="text-center">
        <div className="flex justify-between">
          <div className="p-2 border-2 rounded-md w-full">Docs</div>
          {/* https://dara-consensus.gitbook.io/dara-docs/ */}
          <div className="mx-2 p-2 border-2 rounded-md w-full">Github</div>
          {/* https://github.com/project-dara */}
          <div className="p-2 border-2 rounded-md w-full">Governance</div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-lg text-cyan-400">
        New Here?
        </p>
        <p>Join us on Discord and read this community-made FAQ.</p>
      </div>


      <div className="mt-8">
        <div className="flex justify-between">
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Community</div>
            <div><a href="#">Medium</a></div>
            {/* https://medium.com/@dara.consensus */}
            <div><a href="#">Telegram</a></div>
            <div><a href="#">Discord</a></div>
            {/* https://discord.gg/QnYqwZ3p */}
            <div><a href="#">Twitter</a></div>
            {/* https://twitter.com/project_dara */}
          </div>
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Learn</div>
            <div><a href="#">FAQ</a></div>
            <div><a href="#">Documentation</a></div>
            <div><a href="#">Code</a></div>
          </div>
          <div>
            <div className="mb-2 w-full text-lg text-cyan-400">Others</div>
            <div><a href="#">Team</a></div>
            <div><a href="#">Forum</a></div>
            <div><a href="#">Governance</a></div>
          </div>
        </div>
      </div>
{/* 

        ETH: <Balance />
            Dara: <TokenBalance key={daraToken.address} {...daraToken} />


        <div>
          Show contract info: <br/>
          Minted: {totalSupply? totalSupply.toString(): null} <br/>
          Balance: {balance? balance.toString(): null} <br/>
          CapLeft: {capLeft? capLeft.toString(): null} wei <br/>
          Round: {round? round.toString(): null} <br/>
          Rate: {rate? rate.toString(): null} <br/>
        </div>

        <div>
          <button type="button" onClick={onClick} className="border-2 p-2 bg-pink-600 border-black">
          Buy
        </button>
        </div> */}
    </div>
  );
};

export default Home;
