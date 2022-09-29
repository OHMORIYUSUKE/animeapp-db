import { z } from "zod";

// ShangriLa Anime APIのレスポンス
export const ShangriLa = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  title_short1: z.string(),
  title_short2: z.string(),
  title_short3: z.string(),
  title_en: z.string(),
  public_url: z.union([
    z.string().url().min(1).startsWith("https://"),
    z.string().url().min(1).startsWith("http://"),
  ]),
  twitter_account: z.string().min(1),
  twitter_hash_tag: z.string().min(1),
  cours_id: z.number().nonnegative(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
  sex: z.number().min(0).max(1),
  sequel: z.number().nonnegative(),
  city_code: z.number(),
  city_name: z.string(),
  product_companies: z.string(),
});

// ShangriLa Anime APIのレスポンス全体
export const ShangriLaResponse = z.array(ShangriLa);
