import { z } from "zod";

export const EventFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),

  description: z
    .string()
    .min(10, "address must be at least 10 characters.")
    .max(500, "address must be at least 10 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),
  venue: z
    .string()
    .min(2, "Venue must be at least 2 characters.")
    .max(50, "Venue must be at most 50 characters."),
  price: z
    .number()
    .min(0, "Price must be a positive number.")
    .max(100000, "Price must be at most 100000."),
  image: z
    .string()
    .url("Invalid URL format")
    .optional()
    .refine((url) => /\.(jpg|jpeg|png|gif)$/.test(url), {
      message:
        "Invalid image format. Only jpg, jpeg, png, and gif are allowed.",
    }),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required.")
    .max(5, "A maximum of 5 tags is allowed.")
    .optional(),
});
export type EventFormData = z.infer<typeof EventFormSchema>;
