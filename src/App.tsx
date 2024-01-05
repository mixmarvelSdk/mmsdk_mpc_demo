/*
 * @Author: mouse
 * @Date: 2023-07-13 19:34:21
 * @LastEditTime: 2024-01-05 12:13:45
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/App.tsx
 * @project: 
 */
import { useState } from "react";
import InitMpc from "./components/InitMpc";
import Header from "./components/Header";
import Nft from "./components/Nft";
import Native from "./components/Native";
import Sign from "./components/Sign";
import "./App.css";
import {MmSmartAccount} from "@mixmarvel/mmsdk_mpc";
import Token from "./components/Token";

function App() {
  const [account, setAccount] = useState<MmSmartAccount | undefined>();

  const reset = async () => {
    window.location.reload();
  };
  return (
   
      <div className="App">
        <Header />
        <div className="content">
          <section className="step-1">
            <InitMpc onCreateAccount={setAccount} />
          </section>
          {account && (
            <>
              <h4 className="title">
                Congratulations! We have successfully got mixmarvel mpc Account
              </h4>
              {(
                <section
                  className="feat-section"
                  style={{ marginBottom: "20px" }}
                >
                  <Native account={account} />
                </section>
              )}
              {(
                <section
                  className="feat-section"
                  style={{ marginBottom: "20px" }}
                >
                  <Nft account={account} />
                </section>
              )}
              <section className="feat-section">
                <Token account={account} />
              </section>

              <section className="feat-section">
                <Sign account={account} />
              </section>
            </>
          )}
        </div>
        <div className="bottom">
          <div className="up-btn" onClick={reset}>
            Retry
          </div>
        </div>
      </div>
  );
}

export default App;
