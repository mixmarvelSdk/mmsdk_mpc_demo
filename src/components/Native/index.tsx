import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import {  utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";

interface NativeProps {
  account: MmSmartAccount;
}

function Native(props: NativeProps) {
  const account = props.account;
  const toAddress = "0xA16176f987E3F5388ca8696ca2dCC5c778AB6a19";
  const [transactionHash, setTransactionHash] = useState<string | null>("");
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<any>("");

  const reset = () => {
    setTransactionHash("");
    setError(null);
  };

  const transfer = async () => {
    setTxLoading(true);
    try {
     const receipt = await account.transfer(toAddress, 0.001);
     setTransactionHash(receipt);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setTxLoading(false);
  };


  const fetchBalance = useCallback(async () => {
    const address = account.getAddress();
    // console.log(address,1111);
    let balance = await account.balance(address);
    // console.log(balance,222222);
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
        -  Transfer Native token
      </h4>
      <div>
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
        <>
          {txLoading ? (
            <ReactLoading type="bubbles" color="#8864ff" />
          ) : (
            <div className="up-btn" onClick={transfer}>
              Transfer 0.001 RPG
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

export default Native;
