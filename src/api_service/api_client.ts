import axios, { AxiosResponse } from 'axios';

export default class APIClient{
    _ip: String = "192.168.1.123";
    _port: String = "80";



     apiGet = async (
        url: string,
        parameters?: { [key: string]: any },
        needReturnPrint = false
      ): Promise<string> => {
        const baseUrl = `http://${this._ip}:${this._port}`;  
        const fullUrl = new URL(url, baseUrl);  
      
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
}