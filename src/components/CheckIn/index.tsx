/*
 * @Author: mouse
 * @Date: 2023-10-21 14:05:01
 * @LastEditTime: 2024-02-22 11:13:44
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/components/CheckIn/index.tsx
 * @project: 
 */
import { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import api from "../../utils/api"
interface NftProps {
  account: MmSmartAccount;
}

function CheckIn(props:NftProps) {
  const account = props.account;
  const [checkInLoading, setCheckInLoading] = useState<boolean>(false);
  const [checkInResult, setCheckInResult] = useState<boolean>(false);
  const [wakeUpLoading, setWakeUpLoading] = useState<boolean>(false);
  const [wakeResult, setWakeResult] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [wakeUpTime, setWakeUpTime] = useState<string>("");


  const fetchTime = useCallback(async () => {
    let res = await api.eventStatus({address:account.getAddress()});
    setCheckInTime(res.data.checkIn);
    setWakeUpTime(res.data.wakeUp);
  }, [account])

  useEffect(() => {
    fetchTime()
  }, [fetchTime]);


  const doCheckIn = async () => {
    setCheckInLoading(true);
    const address = account.getAddress();
    const res:boolean = await account.checkIn() as boolean;
    setCheckInLoading(false);
    setCheckInResult(res);
  };

  const doWakeUp = async () => {
    setWakeUpLoading(true);
    const res:boolean = await account.wakeUp() as boolean;
    setWakeUpLoading(false);
    setWakeResult(res);
  };

  return (
    <>
      <h4 className="section-title">- CheckIn And Wake Up</h4>
      <div className="section-content" style={{ display: "flex" }}>
      </div>

      {checkInTime ? (
              <p style={{color: "#ffbb66", marginTop:"5px"}}> Last Check In Time: {checkInTime}</p>
        ) : (
          <ReactLoading
            width="20px"
            height="20px"
            type="bars"
            color="#ffbb66"
          />
        )}

      <div className="up-btn" onClick={doCheckIn}>
          Check In
        </div>
        {checkInLoading ? (
        <ReactLoading type="bubbles" color="#8864ff" />
      ) : (
      <p style={{color: "#8864ff" }}> Check Result: {checkInResult?"success":"fail"}</p>
      )}
       {wakeUpTime ? (
         <p style={{color: "#ffbb66", marginTop:"5px"}}> Last Wake Up Time: {wakeUpTime}</p>
        ) : (
          <ReactLoading
            width="20px"
            height="20px"
            type="bars"
            color="#ffbb66"
          />
        )}
     
        <div className="up-btn" onClick={doWakeUp}>
          Wake Up
        </div>
        {wakeUpLoading ? (
        <ReactLoading type="bubbles" color="#8864ff" />
      ) : (
      <p style={{color: "#8864ff" }}> Wake Up Result: {wakeResult?"success":"fail"}</p>
      )}
    </>
  );
}

export default CheckIn;
