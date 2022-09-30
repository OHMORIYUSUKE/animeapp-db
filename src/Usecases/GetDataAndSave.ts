import { z } from "zod";
import { GetJsonResponse, UrlParams } from "../Domains/Api/GetJsonResponse";
import { ApiJson } from "../Domains/Save/ApiJson";
import { GetMetaData } from "../Domains/Scraping/GetMetaData";

import { AnimeLibrary, AnimeLibraryResponse } from "../Models/Api/AnimeLibrary";

export class GetDataAndSave {
  constructor() {}

  protected static async getDataAndsave(urlParams: UrlParams): Promise<void> {
    // shangriLaApiからjsonを取得
    let getJsonResponse: GetJsonResponse;
    try {
      getJsonResponse = await GetJsonResponse.getJsonResponse(urlParams);
    } catch (e) {
      console.log(e);
      throw new Error();
      //{message: "no_data"} jsonを保存
      const saveRes = await ApiJson.save(urlParams, { message: "no_data" });
      return saveRes;
    }

    // スクレイピング
    const shangriLaApiResponse = getJsonResponse.jsonPerse();

    const animeLibraryResponse = await Promise.all(
      shangriLaApiResponse.map(
        async (animeData): Promise<z.infer<typeof AnimeLibrary>> => {
          try {
            const metaData = await GetMetaData.getSuperagentResponse(
              animeData.public_url
            );
            return {
              ...animeData,
              ...{
                ogp_description: metaData.description(),
                ogp_image_url: metaData.image(),
              },
            };
          } catch (e) {
            return {
              ...animeData,
              ...{
                ogp_description: "",
                ogp_image_url: "",
              },
            };
          }
        }
      )
    );

    // jsonを保存
    const saveRes = await ApiJson.save(
      urlParams,
      AnimeLibraryResponse.parse(animeLibraryResponse)
    );

    return saveRes;
  }
}