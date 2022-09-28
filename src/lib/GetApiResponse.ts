import superagent from "superagent";

interface UrlParams {
  year: number;
  cool: number;
}

export class GetApiResponse {
  private static json: string;

  constructor() {}

  private static getApiResponseValidator(params: UrlParams): boolean {
    const yearDigit = String(params.year).length;
    const coolDigit = String(params.cool).length;
    const today = new Date();
    if (yearDigit === 4 && coolDigit === 1) return true;
    if (2013 < params.year && params.year <= today.getFullYear()) return true;
    return false;
  }

  public static async getApiResponse(
    params: UrlParams
  ): Promise<GetApiResponse> {
    if (!GetApiResponse.getApiResponseValidator(params)) {
      throw new Error("引数に誤りがあります。");
    }
    const url =
      "https://api.moemoe.tokyo/anime/v1/master/" +
      String(params.year) +
      "/" +
      String(params.cool);
    const getApiResponse = new GetApiResponse();
    const res = await superagent.get(url);
    if (res.statusCode !== 200) {
      throw new Error(
        "apiから情報を取得できませんでした。ステータスコード:" + res.statusCode
      );
    }
    this.json = res.body;
    return getApiResponse;
  }

  public jsonPerse(): any {
    const data = GetApiResponse.json;
    // 型変換処理TODO
    return data;
  }
}
