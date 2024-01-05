import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import { useState } from "react";
import ReactLoading from "react-loading";

interface NativeProps {
  account: MmSmartAccount;
}

function Sign(props: NativeProps) {
  const account = props.account;
  const toAddress = "0xA16176f987E3F5388ca8696ca2dCC5c778AB6a19";
  const [signature, setSignature] = useState<string | null>("");
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const reset = () => {
    setSignature("");
    setError(null);
  };

  const SignMessage = async () => {
    setTxLoading(true);
    try {
     const res = await account.signMessage("hello world 222");
     setSignature(res);
     console.log("msg",res);
    } catch (e) {
      setError(e || "Something wrong");
    }
    setTxLoading(false);
  };

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
        </>

      {error && <div className="error-msg">{error.message}</div>}
    </>
  );
}

export default Sign;
