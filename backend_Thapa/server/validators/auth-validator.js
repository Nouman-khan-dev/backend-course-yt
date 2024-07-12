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

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(5, { message: "email must be at least of 5 character" })
    .max(20, "email must be not more than 20 characters"),
  password: z
    .string({ required_error: "please enter password" })
    .min(8, "password must be at least 8 characters")
    .max(25, "password must not be more than 25 characters"),
});

export { signupSchema, loginSchema };
