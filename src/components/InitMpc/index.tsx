/*
 * @Author: mouse
 * @Date: 2023-07-13 19:34:21
 * @LastEditTime: 2023-10-21 17:12:39
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/components/InitMpc/index.tsx
 * @project: 
 */
import ReactLoading from "react-loading";
import { useState,useRef } from "react";
import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import "./index.css"

interface MpcProps {
  onCreateAccount: (account: MmSmartAccount) => void;
}


function InitMpc(props: MpcProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const appId = "SZqfW6L8h3";
  let address = useRef("");
  const env = 0;
  const newUser = {
    account:"sunwenhao0421@163.com",
    timestamp:1697789306,
    signature:"cdf2f5e374f735ee1a69a202038c6f4b8cb6de0b7d7c3dc3281eb2d6f09ef337",
  };

  const authInfo = {
    keyHash:"",
    appPubKey:"",
    keySalt:"",
  };
  const yeehaUserMpc = async()=>{
    const mpc = new MmSmartAccount(
      {
        env,
        appId,
        newUser
      }
    );
    setLoading(true);
    await mpc.init()
    address.current = mpc.getAddress();
    props.onCreateAccount(mpc);
    setLoading(false);
    setSuccess(true);
  }
  const oauthUserMpc = async()=>{
    const mpc = new MmSmartAccount(
      {
        env,
        appId,
        authInfo
      }
    );
    await mpc.init();
  }
  return (
    <>
      <>
        {loading ? (
          <ReactLoading type="bubbles" color="#8864ff" />
        ) : (
          <>
            {success ? (
              <>
              <div> 
              <div className="initSuccess"> init mpc successful  </div>
              address:{address.current}
              </div>
         
              </>
            ) : (
              <>
                <div className="btn-wrapper">
                  <div className="signer-btn" onClick={() => {
                    oauthUserMpc();
                  }}>
                    <div className="signer-icon jwt-icon"/>mixmarvel Oauth user</div>
                </div>
                <div className="btn-wrapper">
                  <div className="signer-btn" onClick={() => {
                    yeehaUserMpc();
                  }}>
                    <div className="signer-icon jwt-icon"/>yeeha use</div>
                </div>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default InitMpc;
