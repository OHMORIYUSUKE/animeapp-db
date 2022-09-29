import { z } from "zod";
import { GetJsonResponse, UrlParams } from "./Domains/Api/GetJsonResponse";
import { ApiJson } from "./Domains/Save/ApiJson";
import { GetMetaData } from "./Domains/Scraping/GetMetaData";

import { AnimeLibrary, AnimeLibraryResponse } from "./Models/Api/AnimeLibrary";

async function main(): Promise<void> {
  const getJsonResponse = await GetJsonResponse.getJsonResponse({
    year: 2022,
    cool: 4,
  } as UrlParams);

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

  // save
  const saveRes = await ApiJson.save(
    {
      year: 2022,
      cool: 4,
    } as UrlParams,
    AnimeLibraryResponse.parse(animeLibraryResponse)
  );

  console.log(saveRes);
}

main();
