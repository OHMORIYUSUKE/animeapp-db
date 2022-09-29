import { z } from "zod";

export const NotFoundResponseJson = z.object({
  message: z.enum(["no_data"]),
});
