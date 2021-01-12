import React, { useState } from "react";
import moment from "moment";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import Balance from "../components/Balance";
import TokenBalance from "../components/TokenBalance";
import Dara from '../contracts/artifacts/Dara.json'
import {addSigner, dara, distributor} from '../contracts'
import { useWeb3React } from "@web3-react/core";
import Countdown from "../components/Countdown";
import {getEthPrice} from '../utils/priceOracle'
import { weiToEth, ethToWei } from "../utils";

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

const asyncFetch = () => (...args) => {
  const [method, ...params] = args;
  return method(...params);
}

export const Home = () => {

  const { account, library } = useWeb3React<Web3Provider>();
  const { data:totalSupply } = useSWR([dara, 'totalSupply'], readFetcher())
  const { data:balance } = useSWR([dara, 'balanceOf', account], readFetcher())
  const { data:capLeft } = useSWR([distributor, 'capLeft'], readFetcher())
  const { data:round } = useSWR([distributor, 'round'], readFetcher())
  const { data:rate } = useSWR([distributor, 'rate'], readFetcher())
  const { data:ethPrice } = useSWR([getEthPrice], asyncFetch())

  const [ fundAmount, setFundAmount ] = useState(0);
  const onInputChange = (e)=>{
    const value = e.target.value//.replace(/\D/,'')
    console.log('e', value);
    setFundAmount(value)
    
  }
  
  const onClick = () => {
    // TODO: should get signer when logging in.
    addSigner(library.getSigner())
    console.log('buy', account, distributor);
    const amountInWei = ethToWei(fundAmount.toString())
    distributor.buyTokens(account, {
        gasLimit: 100000,
      value: amountInWei,
    })
    
  };

  const date = moment().add(10, 'days').toDate()
  // const ethPrice = getEthPrice();
  console.log('ethPrice', ethPrice);

  const rounds = [{round:1, price: 0.000001, cap: 100}, 
    {round:2, price: 0.00001, cap: 100}, 
    {round:3, price: 0.0001, cap: 100}, 
    {round:4, price: 0.001, cap: 100}]
  

  return (
    <div className="">
      <div>
        Explanation of Dara token.
        sell it.
        5 mil token released to community through this crowdfund. 
        
      </div>


      <div className="my-2">
        {/* <p>Round 1 Starts in... </p> */}
        {/* <Countdown date={date}></Countdown> */}
        <p className="text-lg text-cyan-400">Round 1 Starts Jan 15th, 2021</p>
        <p>Be the first to participate</p>
      </div>

      <div className="my-2">
        Crowdsale contract is open source and fully viewable here: [link]
      </div>

      <div className="my-2">
        <p className="mb-2 my-2text-lg text-cyan-400">Pricing Table</p>
        <table className='w-full text-center'>
          <thead>
            <tr>
              <td>Round</td>
              <td>Approx Dara/USD*</td>
              <td>Rate (Dara/Eth)</td>
              <td>Cap Added</td>
              {/* <td>% Increase</td> */}
            </tr>
          </thead>
          <tbody>
            {rounds.map((round, i)=>{
              return (
          <tr key={i}>
            <td>{round.round}</td>
            <td>$ {(round.price * ethPrice).toFixed(4)}</td>
            <td>{round.price}</td>
            <td>{round.cap} ETH</td>
          </tr>
              )
            })}
          </tbody>
        </table>
      </div>

            <p className='my-1'>* Based on Realtime Eth/Dai price from Uniswap</p>

              <p className="mb-2 text-lg text-cyan-400">Participate:</p>
            <div className="mb-2 p-4 border rounded-md">
              <div>
                <div className="flex">
                  <div className="mr-2 text-md text-cyan-400">Current Round: </div>
                  <div className="">{round? round.toString(): null}</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-md text-cyan-400">Current Rate: </div>
                  <div className="">{rate? rate.toString(): null} tokens per Eth</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">Round Ends in:</div>
                  <div className="">28 hours</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">Avaiability:</div>
                  <div className="">{capLeft? weiToEth(capLeft.toString()): null} Eth</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">My Address:</div>
                  <div className="">{account? account: null}</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">Contract Address:</div>
                  <div className="">'asdfasdfsdf' [etherscan]</div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">My Eth:</div>
                  <div className=""><Balance /></div>
                </div>
                <div className="flex">
                  <div className="mr-2 text-cyan-400">My Dara:</div>
                  <div className=""><TokenBalance key={daraToken.address} {...daraToken} /></div>
                </div>
              </div>

              <hr className="my-2" />
              <p className="my-2 text-3xl text-cyan-400">Buy Dara:</p>
        <div>
          {account? 
          <div className="">
            <input type="number" className="p-2 rounded-md rounded-r-none text-black" min={0} value={fundAmount}
          onChange={onInputChange} />
            <button type="button" onClick={onClick} className="p-2 rounded-md rounded-l-none bg-pink-600 border-black">
            Send
          </button>
          <div className="my-2">
            *Send Eth and immediately receive {fundAmount * rate} Dara at current rate
          </div>
          </div>
        : <div>
          Connect Wallet To Access
        </div> }

        </div>
            </div>


        {/* JOIN the community raise before its over. */}

      <div>
        <p className="my-2 text-lg text-cyan-400">What can you do with Dara?</p>
        <li>Stake Dara at start to earn more Dara</li>
      </div>
        <p className="my-2 text-lg text-cyan-400">Check FAQ for common questions</p>

      <br/>

        {/* ETH: <Balance />
            Dara: <TokenBalance key={daraToken.address} {...daraToken} />
        <div>
          Show contract info: <br/>
          Minted: {totalSupply? totalSupply.toString(): null} <br/>
          Balance: {balance? balance.toString(): null} <br/>
          CapLeft: {capLeft? capLeft.toString(): null} wei <br/>
          Round: {round? round.toString(): null} <br/>
          Rate: {rate? rate.toString(): null} <br/>
        </div> */}

        

    </div>
  );
};

export default Home;
