import { GetApiResponse } from "./lib/GetApiResponse";
import { GetMetaData } from "./lib/GetMetaData";

async function main(): Promise<void> {
  const aa = await GetMetaData.getSuperagentResponse(
    "https://isekai-harem.com/"
  );
  console.log(aa.image());
  console.log(aa.description());

  const bb = await GetMetaData.getSuperagentResponse(
    "https://lycoris-recoil.com/"
  );
  console.log(bb.image());
  console.log(bb.description());

  //

  const getApiResponse = await GetApiResponse.getApiResponse({
    year: 2022,
    cool: 3,
  });
  console.log(getApiResponse.jsonPerse());
}

main();
