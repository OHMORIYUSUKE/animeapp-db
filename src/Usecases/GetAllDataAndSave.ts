import { UrlParams } from "../Domains/Api/GetJsonResponse";
import { ConstValues } from "../Domains/Utils/ConstValues";
import { GetDataAndSave } from "./GetDataAndSave";

export class GetAllDataAndSave extends GetDataAndSave {
  constructor() {
    super();
  }

  public static async getAllDataAndSave(): Promise<void> {
    // すべての年とクールの情報
    const today = new Date();
    const nowYear = today.getFullYear();
    let allUrlParams: UrlParams[] = [];
    for (let year = ConstValues.startYear; year <= nowYear; year++) {
      for (let cool = 1; cool <= 4; cool++) {
        allUrlParams.push({ year: year, cool: cool } as UrlParams);
      }
    }
    // 今年から過去の任意年までの情報をすべて取得・それぞれ保存
    allUrlParams.map((urlParam) => {
      const res = GetDataAndSave.getDataAndsave(urlParam);
      return res;
    });
  }
}
