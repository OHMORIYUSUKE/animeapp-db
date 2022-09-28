import superagent from "superagent";
import cheerio from "cheerio";

import { fizzbuzz } from "./lib/fizzbuzz";

const num = 3;
console.log(fizzbuzz(num));

class Crowller {
  private url = "https://qiita.com/suzuki_sh/items/f3349efbfe1bdfc0c634";
  constructor() {
    this.getRawHtml();
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getJobInfo(result.text);
  }

  getJobInfo(html: string) {
    const $ = cheerio.load(html);
    const text = $("h1.css-188vyrl").text();
    console.log(text);
  }
}

const crowller = new Crowller();
