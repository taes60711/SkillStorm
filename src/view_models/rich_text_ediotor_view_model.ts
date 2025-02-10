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
                        let resultString: String = getImage(imgSrc);
                        let uid: String = crypto.randomUUID();

                        const imageId: String = await imageService.imageIsExist(resultString);

                        if (imageId != "-1") {
                            uid = imageId;
                        } else {
                            await imageService.saveImg(uid, resultString);
                        }

                        const imgStringToHttp = `<img src="https://$domain/images/${uid}">`;
                        htmlString = htmlString.replace(imgSrc, imgStringToHttp);
                    }
                }
            }
        }


        return htmlString;
    }
}

function getImage(base64Html: string): string {
    const base64Match = base64Html.match(/src="data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)"/);
    return base64Match ? base64Match[1] : '';
}