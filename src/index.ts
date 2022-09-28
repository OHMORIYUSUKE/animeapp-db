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
}

main();
