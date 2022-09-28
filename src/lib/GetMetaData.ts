import superagent from "superagent";
import cheerio from "cheerio";

export class GetMetaData {
  private static $: cheerio.Root;

  constructor() {}

  public static async getSuperagentResponse(url: string): Promise<GetMetaData> {
    const getMetaData = new GetMetaData();
    const res = await superagent.get(url);
    if (res.status !== 200) {
      throw new Error(
        "webページが正常に動作していません。ステータスコード:" + res.statusCode
      );
    }
    this.$ = cheerio.load(res.text);
    return getMetaData;
  }

  public image(): string {
    const image = GetMetaData.$('meta[property="og:image"]').attr("content");
    if (image?.startsWith("http://")) {
      throw new Error(
        "ogp画像がhttpに存在するため無視されました。画像url:" + image
      );
    }
    if (image === undefined) {
      throw new Error("ogp画像が見つかりませんでした。");
    } else {
      return image;
    }
  }

  public description(): string {
    const description = GetMetaData.$('meta[property="og:description"]').attr(
      "content"
    );
    if (description === undefined) {
      throw new Error("ogpの説明が見つかりませんでした。");
    } else {
      return description;
    }
  }
}
