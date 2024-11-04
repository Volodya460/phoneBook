import { z } from "zod";

export const addSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be longer" })
    .max(30, { message: "Too long" })
    .refine(
      (value) => value.trim().length > 0,
      "Name cannot be only whitespace"
    ),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(4, "Too short")
    .email({ message: "Invalid email address" })
    .refine(
      (value) => value.trim().length > 0,
      "Email cannot be only whitespace"
    ),
  phone: z
    .string()
    .min(1, { message: "Number is required" })
    .min(10, "Too short")
    .max(30, { message: "Too long" })
    .refine(
      (value) => value.trim().length > 0,
      "Number cannot be only whitespace"
    ),
});
