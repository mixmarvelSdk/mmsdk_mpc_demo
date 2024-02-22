/*
 * @Author: mouse
 * @Date: 2023-07-13 19:34:21
 * @LastEditTime: 2024-02-22 11:10:13
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /mmsdk_mpc_demo/src/utils/api.ts
 * @project: 
 */
import axios from 'axios';
import { AxiosInstance } from 'axios';
class request{
    public api!: AxiosInstance;
    static instance: request;
    constructor(){
        this.api = axios.create(
            {
                baseURL: "https://auth-dev.mixmarvel-sdk.com/",
                // baseURL: "http://127.0.0.1:3030"
            }
        );
        this.api.defaults.timeout = 10000;
        this.api.defaults.headers.post['Content-Type'] = 'application/json';
        this.api.interceptors.response.use(
            (response: any) => {
                if (response?.status === 200) {
                    return Promise.resolve(response?.data);
                } else {
                    return Promise.reject(response);
                }
            },
            (error: any) => {
                return Promise.reject(error);
            });    
        }

    static getInstance() {
        if (!request.instance) {
            const ins = new request();
            request.instance = ins;
        }
        return request.instance;
    }
}
const req:request = request.getInstance();

const api:any = new Object();

/**
 * 验证签名
 */
api["verifyMessage"] = (p:any) => req.api.post('auth/verifyMessage', p);

/**
 * 活动状态
 */
api["eventStatus"] = (p:any) => req.api.post('event/status', p);


export default api
