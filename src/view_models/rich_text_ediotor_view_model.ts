import { EditTools } from "@/global/edit_tools";
import ImageService from "@/services/image_service";

export default class RichTextEditorViewModel {
    /**
     * 將編輯中的HtmlString轉成要顯示的格式
     * @returns 要進Database內的格式
     */
    public async formatToDataBaseStr(richTextStr: string): Promise<string> {
        const imageService = new ImageService();
        let htmlString: string = richTextStr;
        const parser = new DOMParser();
        const doc = parser.parseFromString(richTextStr, 'text/html');
        const elements = doc.querySelectorAll('*');

        for (const element of Array.from(elements)) {
            if (element.localName === 'p') {
                const innerDoc = parser.parseFromString(element.innerHTML, 'text/html');
                const innerElements = innerDoc.body.querySelectorAll('*');

                for (const innerElement of Array.from(innerElements)) {
                    const imgSrc = innerElement.outerHTML;

                    if (imgSrc.includes('base64,')) {
                        const uploadedImgUrl: string = await new EditTools().uploadImgToDatabase(imgSrc);
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
}

