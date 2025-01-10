import axios, { type AxiosResponse } from 'axios';
import { ip, port } from "./api.config";


export default class APIClient {
  protected baseUrl: string;

  constructor(baseUrl: string = `http://${ip}:${port}`) {
    this.baseUrl = baseUrl;
  }

  apiGet = async <T>(
    url: string,
    parameters?: { [key: string]: any },
    needReturnPrint = false
  ): Promise<T | string> => {
    const fullUrl = new URL(`${this.baseUrl}${url}`);

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        fullUrl.searchParams.append(key, parameters[key]);
      });
    }

    try {
      console.log("Get API URL:", fullUrl.toString());
      console.log("Parameters:", parameters);

      const response: AxiosResponse = await axios.get(fullUrl.toString());
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
      }


      if (needReturnPrint) {
        console.log("Returned Data:", response.data);
      }

      return response.data;
    } catch (error) {

      console.error("API call error:", error);
      return "null";
    }
  };

  apiPush = async <T>(
    url: string,
    body?: { [key: string]: any },
    headers: { [key: string]: string } = { 'content-type': 'application/json' },
  ): Promise<T | string> => {
    const fullUrl = new URL(`${this.baseUrl}${url}`);

    try {
      console.log("Put API URL:", fullUrl.toString());
      console.log(`body: ${JSON.stringify(body)}`);

      const response: AxiosResponse = await axios.put(fullUrl.toString(), body, headers);

      if (response.status !== 200) {
        throw new Error(`${response.status}`);
      }

      return response.data;
    } catch (error) {
      return "null";
    }
  };
}