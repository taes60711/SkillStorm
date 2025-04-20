import { APIHttpController } from "@/global/api_http_controller";
import { EditTools } from "@/global/edit_tools";
import ImageService from "@/services/image_service";

export default class RichTextEditorViewModel {
  /**
   * 將編輯中的HtmlString轉成要顯示的格式
   * @returns 要進Database內的格式
   */
  public async formatToDataBaseStr(richTextStr: string): Promise<string> {
    let htmlString: string = richTextStr;
    const parser = new DOMParser();
    const doc = parser.parseFromString(richTextStr, "text/html");
    const elements = doc.querySelectorAll("*");

    for (const element of Array.from(elements)) {
      if (element.localName === "p") {
        const innerDoc = parser.parseFromString(element.innerHTML, "text/html");
        const innerElements = innerDoc.body.querySelectorAll("*");

        for (const innerElement of Array.from(innerElements)) {
          const imgSrc = innerElement.outerHTML;

          if (imgSrc.includes("base64,")) {
            const uploadedImgUrl: string =
              await new EditTools().uploadImgToDatabase(imgSrc);
            if (uploadedImgUrl !== "failed") {
              const imgStringToHttp = `<img src="${uploadedImgUrl}">`;
              htmlString = htmlString.replace(imgSrc, imgStringToHttp);
            }
          }
        }
      }
    }

    return htmlString;
  }
  /**
   * 將編輯過的HtmlString轉成要顯示的格式
   * @returns 網頁要顯示的格式
   */
  public formatToViewStr(richTextStr: string): string {
    let htmlString: string = richTextStr;
    const parser = new DOMParser();
    const doc = parser.parseFromString(richTextStr, "text/html");
    const elements = doc.querySelectorAll("*");

    for (const element of Array.from(elements)) {
      if (element.localName === "p") {
        const innerDoc = parser.parseFromString(element.innerHTML, "text/html");
        const innerElements = innerDoc.body.querySelectorAll("*");

        for (const innerElement of Array.from(innerElements)) {
          const pTagHtml = innerElement.outerHTML;
          if (pTagHtml.includes(APIHttpController.databaseDomainStr)) {
            /// 將資料庫的圖片格式轉為可以顯示的圖片格式
            const formatttedImg: string = new EditTools().getRealImgStr(
              pTagHtml
            );
            htmlString = htmlString.replace(pTagHtml, formatttedImg);
          }
          if (pTagHtml.includes("a href")) {
            /// v-html內處理不了 a 的 style 直接在這邊處理
            const updatedHtml = pTagHtml.replace(
              "<a",
              '<a style="color: #3faaff; text-decoration: underline;" '
            );
            htmlString = htmlString.replace(pTagHtml, updatedHtml);
          }
        }
      } else if (element.localName === "iframe") {
        const srcAttr = element.getAttribute("src");
        if (srcAttr) {
          const ytId: string = new EditTools().getYtvideoID(srcAttr);
          /// 將Yt影片改為可顯示的格式
          htmlString = htmlString.replace(
            element.outerHTML,
            `<iframe allowfullscreen="true" width="100%" height="365" src="https://www.youtube.com/embed/${ytId}"></iframe>`
          );
        }
      }
    }

    return htmlString;
  }
}
