import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(4, "Too short your email")
    .email({ message: "Invalid email address" })
    .refine(
      (value) => value.trim().length > 0,
      "Email cannot be only whitespace"
    ),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(4, "Too short your password")
    .refine(
      (value) => value.trim().length > 0,
      "Password cannot be only whitespace"
    ),
});