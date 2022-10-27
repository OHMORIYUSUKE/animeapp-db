import superagent from "superagent";
import cheerio from "cheerio";
import { ConstValues } from "../Utils/ConstValues";

export class GetMetaData {
  private static $: cheerio.Root;

  public static async getSuperagentResponse(url: string): Promise<GetMetaData> {
    const getMetaData = new GetMetaData();
    let res: superagent.Response;
    try {
      res = await superagent.get(url).timeout(ConstValues.httpTimeOut);
    } catch (e) {
      throw new Error("webページから情報を取得できませんでした。エラーメッセージ:" + e);
    }
    this.$ = cheerio.load(res.text);
    return getMetaData;
  }

  public image(): string {
    const image = GetMetaData.$('meta[property="og:image"]').attr("content");
    if (!image?.startsWith("https://")) {
      throw new Error("ogp画像がhttpsに存在していない、または不正なurlのため無視されました。画像url:" + image);
    }
    if (image === undefined) {
      throw new Error("ogp画像が見つかりませんでした。");
    } else {
      return image;
    }
  }

  public description(): string {
    const description = GetMetaData.$('meta[property="og:description"]').attr("content");
    if (description === undefined) {
      throw new Error("ogpの説明が見つかりませんでした。");
    } else {
      return description;
    }
  }
}
