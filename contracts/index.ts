import { providers, Contract, Wallet, utils } from "ethers";
import Dara from "./artifacts/Dara.json";
import Distributor from "./artifacts/Distributor.json";

export let dara: Contract;
export let distributor: Contract;

export enum PublicNetworks {
  DEVELOPMENT = "development",
  RINKEBY = "rinkeby",
  GOERLI = "goerli",
  MAIN = "main",
}
export enum PublicNetworkID {
  RINKEBY = "4",
  MAIN = "1",
}

function getArtifactAddress(artifact: any, network: PublicNetworkID) {
  return artifact.networks[network].address;
}

function setReadContracts() {
  const networkId = PublicNetworkID.RINKEBY;

  const provider = new providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/6e3425c1e85b446ca0a774611d40ec71"
  );
  dara = new Contract(getArtifactAddress(Dara, networkId), Dara.abi, provider);
  distributor = new Contract(
    getArtifactAddress(Distributor, networkId),
    Distributor.abi,
    provider
  );
}

setReadContracts();

// signer or provider
export function addSigner(signer) {
  console.log("addSigner", signer);

  dara = dara.connect(signer);
  distributor = distributor.connect(signer);
}
