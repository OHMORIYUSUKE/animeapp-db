import { GetAllDataAndSave } from "./Usecases/GetAllDataAndSave";

async function main(): Promise<void> {
  return await GetAllDataAndSave.getAllDataAndSave();
}

main();
