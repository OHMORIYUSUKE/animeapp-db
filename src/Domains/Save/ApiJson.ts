import { z } from "zod";
import { AnimeLibraryResponse } from "../../Models/Api/AnimeLibrary";
import { UrlParams } from "../Api/GetJsonResponse";

import * as fs from "fs";
import { NotFoundResponseJson } from "../../Models/SaveJson/NotFoundResponseJson";
import { ConstValues } from "../Utils/ConstValues";

export class ApiJson {
  public static save(
    fileNameData: UrlParams,
    saveData: z.infer<typeof AnimeLibraryResponse> | z.infer<typeof NotFoundResponseJson>
  ): void {
    const fileName = String(fileNameData.year) + "-" + String(fileNameData.cool) + ".json";
    const stringSavedata = JSON.stringify(saveData, null, 2);
    try {
      fs.mkdirSync(ConstValues.jsonSaveDir, { recursive: true });
      fs.writeFileSync(ConstValues.jsonSaveDir + fileName, stringSavedata, {
        flag: "w",
      });
    } catch (e) {
      console.log(e);
      throw new Error("保存に失敗しました。エラーメッセージ:" + e);
    }
  }
}
