/*
 * @Author: mouse
 * @Date: 2023-07-13 19:34:21
 * @LastEditTime: 2023-10-21 17:55:59
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/utils/contract.ts
 * @project: 
 */
import { Contract, providers, utils } from "ethers";
import nftAbi from "./nft.json";
import tokenAbi from "./token.json";
import { FeeOption } from "@unipasswallet/smart-account";

export const NFTContractAddress = "0xc1F626C6051C7d5B0aC5b9b3D94AdC0eA6C3B3B7";
export const FTContractAddress = "0x48179d92b7CD4e06529d47474d7fed17462589F6";

export interface ChainConfigI {
  name: string
  chainId: number
  rpcUrl: string
  usdcContractAddress: string
  decimal?: number
  explorer?: string
}

export const ChainConfig: ChainConfigI[] = [
  {
    // bsc-testnet
    name: "robin",
    chainId: 9527,
    rpcUrl: "https://robin.rangersprotocol.com/api/jsonrpc",
    usdcContractAddress: "0x64544969ed7EBf5f083679233325356EbE738930",
    decimal: 18,
    explorer: "https://robin-rangersscan.rangersprotocol.com/",
  }
];

const RPC_URL = "https://robin.rangersprotocol.com/api/jsonrpc";
const provider = new providers.JsonRpcProvider(RPC_URL);
export const NFTContract = new Contract(
  utils.getAddress(NFTContractAddress),
  nftAbi,
  provider
);

export 

const FTContract = new Contract(
  utils.getAddress(FTContractAddress),
  tokenAbi,
  provider
);

export interface FormattedFeeOption extends FeeOption {
  // symbol: string;
  value: string;
}

export function mintNFTFunctionData(address: string) {
  return NFTContract.interface.encodeFunctionData("mint", [address]);
}

export function mintFtFunctionData(address: string, amount:string){
  return FTContract.interface.encodeFunctionData("mint", [address,amount]);
}



export function tokenFormatter(feeOption: FeeOption): FormattedFeeOption {
  return {
    ...feeOption,
    value: utils.formatUnits(feeOption.amount, feeOption.decimals),
  };
}
