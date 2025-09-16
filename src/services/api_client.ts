import { ModalController } from "@/components/utilities/Modal/ModalController";
import axios, { type AxiosResponse } from "axios";
import confimModal from "@/components/utilities/Modal/confirmModal.vue";
import type { APIResponseData } from "@/models/api_response_data";

export default class APIClient {
  protected baseUrl: string;

  constructor(baseUrl: string = `noInsertURL`) {
    this.baseUrl = baseUrl;
  }

  modalController: ModalController = new ModalController();

  apiGet = async <T>(
    url: string,
    parameters?: { [key: string]: any },
    needReturnPrint = false
  ): Promise<T | string> => {
    const fullUrl = new URL(`${this.baseUrl}${url}`);

    if (parameters) {
      Object.keys(parameters).forEach((key) => {
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
    headers: { [key: string]: string } = { "Content-Type": "application/json" }
  ): Promise<T | string> => {
    const fullUrl = new URL(`${this.baseUrl}${url}`);

    try {
      console.log("Put API URL:", fullUrl.toString());
      console.log(`body: ${JSON.stringify(body)}`);

      const response: AxiosResponse<T> = await axios.put(
        fullUrl.toString(),
        body,
        {
          headers: { ...headers }
        }
      );

      return response.data;
    } catch (error) {
      return "null";
    }
  };

  serverErrHint = (errMessage: string) => {
    this.modalController.show(
      confimModal,
      {
        modalText: errMessage,
        confirmFunc: () => {
          this.modalController.close();
        }
      },
      false,
      false,
      "rgba(0, 0, 0, 0.4)",
      "serverErrHintModal"
    );
  };

  // 泛型函式
  handleReponseData = <T>(
    response: APIResponseData<T> | string
  ): APIResponseData<T> => {
    if (typeof response === "string") {
      console.error("Server Error:", response);
      this.serverErrHint("伺服器錯誤");
      return {
        statusCode: "501",
        statusMessage: "serverErr",
        data: response as unknown as T
      };
    } else {
      switch (response.statusCode) {
        case "200":
          console.log("Success");
          break;
        case "400":
          this.serverErrHint("資料格式錯誤");
          console.log("資料格式錯誤");
          break;
      }

      return response;
    }
  };
}
