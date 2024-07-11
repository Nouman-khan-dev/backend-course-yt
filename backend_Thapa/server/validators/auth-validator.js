import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(5, { message: "Name must be at least of 4 chars" })
    .max(255, {
      message: "Name must be not more than 255 characters",
    }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(5, { message: "email must be at least of 5 characters" })
    .max(255, {
      message: "email must be not more than 255 characters",
    }),
  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be at least of 10 chars" })
    .max(20, {
      message: "phone must be not more than 20 characters",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "password must be at least of 8 chars" })
    .max(255, {
      message: "password must be not more than 255 characters",
    }),
});

export default signupSchema;
