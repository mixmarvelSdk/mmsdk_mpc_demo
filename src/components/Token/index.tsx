import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import { BigNumber, utils } from "ethers";
import {
  FTContractAddress,
  mintFtFunctionData
} from "../../utils/contract";
import { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";

interface TokenProps {
  account: MmSmartAccount;
}

function Token(props: TokenProps) {
  const account = props.account;
  const toAddress = "0xA16176f987E3F5388ca8696ca2dCC5c778AB6a19";
  const [transactionHash, setTransactionHash] = useState<string | null>("");
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<any>("");

  const reset = () => {
    setTransactionHash("");
    setError(null);
  };

  const Mint = async () => {
    setMintLoading(true);
    const  amount = utils.parseEther("100").toString();
    const address = await account.getAddress();
    const data = mintFtFunctionData(address, amount);
    const tx = {
      value: BigNumber.from(0).toHexString(),
      to: FTContractAddress,
      data,
    };

    try {
      const receipt = await account.sendTransaction(tx);
     setTransactionHash(receipt);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setMintLoading(false);
  };
  const transfer = async () => {
    setTxLoading(true);
    try {
     const receipt = await account.transferToken(FTContractAddress, toAddress, utils.parseUnits("10", 18).toString());
     setTransactionHash(receipt);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setTxLoading(false);
  };


  const fetchBalance = useCallback(async () => {
    const address = account.getAddress();
    let balance = await account.tokenBalance(FTContractAddress, address);
    balance = utils.formatEther(balance).toString();
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

  return (
    <>
      <h4 className="section-title">
        - Mint and Transfer token
      </h4>
      <div>
       
       <a
         target="_blank"
         rel="noreferrer"
         href={`https://robin-rangersscan.rangersprotocol.com/address/${FTContractAddress}/`}
       >
         {" "}
         Token Contract
       </a>{" "}
     </div>
      <div className="section-content" style={{ display: "flex" }}>
        {" "}
        Token Balance:{" "}
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
      {mintLoading ? (
            <ReactLoading type="bubbles" color="#8864ff" />
          ) : (
            <div className="up-btn" onClick={Mint}>
              Mint 100 Token
            </div>
          )}
        <>
          {txLoading ? (
            <ReactLoading type="bubbles" color="#8864ff" />
          ) : (
            <div className="up-btn" onClick={transfer}>
              Transfer 10 Token
            </div>
          )}

          {transactionHash && (
            <div>
              Congratulations! The transaction was sent successfully. You can
              view this{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://robin-rangersscan.rangersprotocol.com/tx/${transactionHash}`}
              >
                transaction
              </a>{" "}
              in the explorer.
            </div>
          )}
        </>

      {error && <div className="error-msg">{error.message}</div>}
    </>
  );
}

export default Token;
