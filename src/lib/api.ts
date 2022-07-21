import { create } from "apisauce";
import axios from 'axios';
import { AxiosRequestHeaders, AxiosRequestConfig, Method, AxiosInstance } from "axios";
import {ApisauceConfig} from "apisauce";

export const client = create({
  baseURL: "http://localhost:3001/api/",
});

// type Headers = {
//   Authorization?: string | undefined;
//   'Content-Type': string | undefined;
//   [key: string]: any;
// };

type Options = {
  data?: any;
  token?: string;
  headers?: Headers;
  [key: string]: any;
};

type Config = {
  method: Method;
  body: Options["data"];
  token: Options["token"];
  headers: AxiosRequestHeaders;
  [key: string]: any;
};

async function apiClient(
  url: string,
  { data, token, headers: customHeaders, ...customConfig }: Options | Record<string, string | any>  = {},
) {

  interface CustomConfig extends AxiosRequestConfig {
    baseURL?: string;
    // method?: Method;
    url?: string;
    data?: any;
    headers?: AxiosRequestHeaders;
    [key: string]: any;
  }

  const config: CustomConfig = {
    baseURL: "http://localhost:3001/api/",
    // method: data ? 'POST' : 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : false,
      'Content-Type': data ? 'application/json' : false,
      ...customHeaders as Record<string, any>,
    },
    ...customConfig,
  }

  const customAxiosInstance = axios.create(config);

  // const customAxiosInstance: AxiosInstance = axios.create({
  //   baseURL: "http://localhost:3001/api/",
  //   method: data ? 'POST' : 'GET',
  //   data: data ? data : undefined,
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : false,
  //     'Content-Type': data ? 'application/json' : false,
  //     ...customHeaders as Record<string, any>,
  //   },
  //   ...customConfig,
  // });

  // const apisauceInstance = create({ axiosInstance: customAxiosInstance});

}
