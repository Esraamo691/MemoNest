import * as zod from "zod";

export const schema = zod.object({
  name: zod.string().max(15, "the max length 15 char"),
  email: zod.email(),
  password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid",
    ),
  age: zod.string().refine((data) => data > 18, "the age must be +18"),
  phone: zod.string().regex(/^01[0125][0-9]{8}$/, "the phone is not valid"),
});
export const loginSchema = zod.object({
  email: zod.email(),
  password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid",
    ),
});
