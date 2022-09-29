import { z } from "zod";
import { AnimeLibraryResponse } from "../../Models/Api/AnimeLibrary";
import { UrlParams } from "../Api/GetJsonResponse";

import * as fs from "fs";
import { NotFoundResponseJson } from "../../Models/SaveJson/NotFoundResponseJson";

export class ApiJson {
  constructor() {}

  public static save(
    fileNameData: UrlParams,
    saveData:
      | z.infer<typeof AnimeLibraryResponse>
      | z.infer<typeof NotFoundResponseJson>
  ): void {
    const fileName =
      String(fileNameData.year) + "-" + String(fileNameData.cool) + ".json";
    const stringSavedata = JSON.stringify(saveData, null, 2);
    try {
      fs.writeFileSync("storage/" + fileName, stringSavedata, {
        flag: "w",
      });
    } catch (e) {
      console.log(e);
      throw new Error("保存に失敗しました。エラーメッセージ:" + e);
    }
  }
}
