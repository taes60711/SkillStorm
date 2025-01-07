import axios, { AxiosResponse } from 'axios';

export default class APIClient {
  _ip: string = "192.168.1.160";
  _port: string = "80";
  baseUrl: string = `http://${this._ip}:${this._port}`;

  apiGet = async (
    url: string,
    parameters?: { [key: string]: any },
    needReturnPrint = false
  ): Promise<string> => {

    const fullUrl = new URL(url, this.baseUrl);

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

  apiPush = async (
    url: string,
    headers: { [key: string]: string } = { 'content-type': 'application/json' },
    body?: { [key: string]: any },
  ): Promise<string> => {
    const fullUrl = new URL(url, this.baseUrl);

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