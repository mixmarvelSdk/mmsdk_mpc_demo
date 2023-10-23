/*
 * @Author: mouse
 * @Date: 2023-10-21 14:05:01
 * @LastEditTime: 2023-10-23 14:33:15
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/components/Nft/index.tsx
 * @project: 
 */
import { NFTContractAddress, mintNFTFunctionData, NFTContract} from "../../utils/contract";
import { useState, useCallback, useEffect } from "react";
import ReactLoading from "react-loading";
import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import { BigNumber } from "ethers";
interface NftProps {
  account: MmSmartAccount;
}

function Nft(props:NftProps) {
  const account = props.account;
  const toAddress = "0xA16176f987E3F5388ca8696ca2dCC5c778AB6a19";
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [transferLoading, setTransferLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const startMint = async () => {
    setTransactionHash("");
    setMintLoading(true);
    const address = await account.getAddress();
    const data = mintNFTFunctionData(address);
    const tx = {
      value: BigNumber.from(0).toHexString(),
      to: NFTContractAddress,
      data,
    };
    const receipt:string = await account.sendTransaction(tx) as string;

    setMintLoading(false);
    setTransactionHash(receipt);
  };
  const reset = () => {
    setTransactionHash("");
  };
  const transfer = async()=>{
    setTransactionHash("");
    setTransferLoading(true);
    const tokenId = await getTokenId();
    const receipt = await account.transferNft(NFTContractAddress, toAddress, tokenId) as string;

    setTransferLoading(false);
    setTransactionHash(receipt);
  }
  const fetchBalance = useCallback(async () => {
    const address = account.getAddress();
    let balance = await account.tokenBalance(NFTContractAddress, address);
    setBalance(balance)
  }, [account])

  useEffect(() => {
    reset();
    setBalance("");
    const interval = setInterval(() => {
      fetchBalance()
    }, 3000)
    return () => clearTimeout(interval)
  }, [fetchBalance]);

  const getTokenId = async()=>{
    let tokenId = await NFTContract.tokenOfOwnerByIndex(account.getAddress(), 0);
    console.log(tokenId.toString());
    return tokenId.toString();
  }

  return (
    <>
      <h4 className="section-title">- Mint And transfer Nft</h4>
      <div className="section-content" style={{ display: "flex" }}>
        {" "}
        Nft Balance:{" "}
        {balance ? (
          <b>{balance}</b>
        ) : (
          <ReactLoading
            width="20px"
            height="20px"
            type="bars"
            color="#8864ff"
          />
        )}
      </div>
      <div>
       
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://robin-rangersscan.rangersprotocol.com/address/${NFTContractAddress}/`}
        >
          {" "}
          NFT Contract
        </a>{" "}
      </div>
      {mintLoading ? (
        <ReactLoading type="bubbles" color="#8864ff" />
      ) : (
        <div className="up-btn" onClick={startMint}>
          Mint NFT
        </div>
      )}
           {transferLoading ? (
        <ReactLoading type="bubbles" color="#8864ff" />
      ) : (
        <div className="up-btn" onClick={transfer}>
          Transfer NFT
        </div>
      )}
      {transactionHash && (
        <div>
          {" "}
          Congratulations! send transaction Successfully{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://robin-rangersscan.rangersprotocol.com/tx/${transactionHash}`}
          >
            transaction
          </a>{" "}
          in explorer.
        </div>
      )}
    </>
  );
}

export default Nft;
