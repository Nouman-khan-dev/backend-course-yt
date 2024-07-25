import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "email must be at least of 3 character" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "email is not valid" })
    .min(3, { message: "email must be at least of 3 characters" }),
  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(5, { message: "phone must be at least of 5 chars" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(4, { message: "password must be at least of 4 chars" })
    .max(255, {
      message: "password must be not more than 255 characters",
    }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "email is not valid" })
    .min(3, { message: "email must be at least of 3 character" }),
  password: z
    .string({ required_error: "please enter password" })
    .min(3, "password must be at least 3 characters"),
});

export { signupSchema, loginSchema };
