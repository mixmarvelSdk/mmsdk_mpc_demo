/*
 * @Author: mouse
 * @Date: 2024-01-05 12:11:52
 * @LastEditTime: 2024-02-21 17:57:05
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/components/Sign/index.tsx
 * @project: 
 */
import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import { useState } from "react";
import api from "../../utils/api"
interface NativeProps {
  account: MmSmartAccount;
}

function Sign(props: NativeProps) {
  const account = props.account;
  const toAddress = "0xA16176f987E3F5388ca8696ca2dCC5c778AB6a19";
  const [signature, setSignature] = useState<string | null>("");
  const [uid, setUid] = useState<string | null>("");
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const reset = () => {
    setSignature("");
    setError(null);
  };

  const SignMessage = async () => {
    setTxLoading(true);
    try {
     const res = await account.signMessage("hello");
     setSignature(res);
     console.log("msg",res);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setTxLoading(false);
  };

  const verifyMessage = async()=>{
    setTxLoading(true);
    try {
      const appPubKey = account.getAppPubKey();
      const word = "hello";
      const address = account.getAddress();
     const res = await api.verifyMessage({appPubKey, word, address, signature});
      
     setUid(res.data.uid);
     console.log("msg",res);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setTxLoading(false);
  }

  return (
    <>
      <h4 className="section-title">
        -  Sign Message
      </h4>
      <div>
     </div>
      <div className="section-content" style={{ display: "flex" }}>
      </div>
        <>
            <div className="up-btn" onClick={SignMessage}>
              SignMessage
            </div>
        

          {signature && (
            <div>
            {signature}
            </div>
          )}
             <div className="up-btn" onClick={verifyMessage}>
             verifyMessage
            </div>
        </>
        {uid && <div className="error-msg">uid:{uid}</div>}
      {error && <div className="error-msg">{error.message}</div>}
    </>
  );
}

export default Sign;
