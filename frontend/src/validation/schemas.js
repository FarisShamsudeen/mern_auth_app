import { z } from "zod";

/* AUTH */
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* PROFILE */
export const profileSchema = z.object({
  name: z.string().min(3, "Name too short"),
  phone: z.string().min(10, "Phone number is invalid"),
});

/* ADMIN */
export const adminUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is invalid"),
  password: z.string().min(6).optional().or(z.literal("")),
  role: z.enum(["user", "admin"]),
});

