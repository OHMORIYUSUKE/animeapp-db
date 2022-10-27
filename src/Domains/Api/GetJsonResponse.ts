import superagent from "superagent";
import { z } from "zod";

import { ShangriLaResponse } from "../../Models/Api/ShangriLa";
import { ConstValues } from "../Utils/ConstValues";

export interface UrlParams {
  year: number;
  cool: number;
}

export class GetJsonResponse {
  private static json: string;

  private static getJsonResponseValidator(params: UrlParams): boolean {
    const yearDigit = String(params.year).length;
    const coolDigit = String(params.cool).length;
    const today = new Date();
    if (
      yearDigit === 4 &&
      coolDigit === 1 &&
      ConstValues.startYear <= params.year &&
      params.year <= today.getFullYear() &&
      params.cool >= 1 &&
      params.cool <= 4
    )
      return true;
    return false;
  }

  public static async getJsonResponse(params: UrlParams): Promise<GetJsonResponse> {
    if (!GetJsonResponse.getJsonResponseValidator(params)) {
      throw new Error("引数に誤りがあります。");
    }
    const url = "https://api.moemoe.tokyo/anime/v1/master/" + String(params.year) + "/" + String(params.cool);
    const getApiResponse = new GetJsonResponse();
    let res: superagent.Response;
    try {
      res = await superagent.get(url).timeout(ConstValues.httpTimeOut);
    } catch (e) {
      throw new Error("apiから情報を取得できませんでした。エラーメッセージ:" + e);
    }
    this.json = res.body;
    return getApiResponse;
  }

  public jsonPerse(): z.infer<typeof ShangriLaResponse> {
    const json = GetJsonResponse.json;
    try {
      const validJson = ShangriLaResponse.parse(JSON.parse(JSON.stringify(json)));
      return validJson;
    } catch (e) {
      throw new Error("apiのjsonをパースできませんでした。apiに変更の可能性があります。エラーメッセージ:" + e);
    }
  }
}
