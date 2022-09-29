import { GetAllDataAndSave } from "./Usecases/GetAllDataAndSave";

async function main(): Promise<void> {
  return GetAllDataAndSave.getAllDataAndSave();
}

main();
