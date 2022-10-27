export class ReplaceInvalidChars {
  public static replaceInvalidChars(title: string): string {
    let replaced = title.split("?").join("？");
    replaced = replaced.split("/").join("／");
    return replaced;
  }
}
