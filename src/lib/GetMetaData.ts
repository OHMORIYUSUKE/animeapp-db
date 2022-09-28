import superagent from "superagent";
import cheerio from "cheerio";

export class GetMetaData {
  private static html: string;
  private static $: cheerio.Root;

  constructor() {}

  public static async getSuperagentResponse(url: string): Promise<GetMetaData> {
    const getMetaData = new GetMetaData();
    const res = await superagent.get(url);
    this.html = res.text;
    this.$ = cheerio.load(res.text);
    return getMetaData;
  }

  public image(): string {
    const image = GetMetaData.$('meta[property="og:image"]').attr("content");
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
