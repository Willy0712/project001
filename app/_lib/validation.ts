import { z } from "zod";

export const uploadNewsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  categoryId: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(1, "Category is required.")
  ),
  subCategoryId: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(1, "Category is required.")
  ),
  content: z.string().min(10, "Content must be at least 10 characters."),
  selectedAddress: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Address must be valid, choose from the dropdown" }
  ),
  userId: z.number(),
});

export const uploadNewsSchemaServer = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  categoryId: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(1, "Category is required.")
  ),
  subCategoryId: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(1, "Subcategory is required.")
  ),
  content: z.string().min(10, "Content must be at least 10 characters."),
  selectedAddress: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Address must be valid, choose from the dropdown" }
  ),
  userId: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(1, "User ID is required.")
  ),
  image: z
    .array(z.instanceof(File))
    .min(1, "At least one image must be uploaded.")
    .max(5, "You can upload up to 5 images."),
});

export const updateNewSchema = z.object({
  title: z.string().nonempty("Title is required"),
  categoryId: z.number(),
  subCategoryId: z.number().optional(),
  content: z.string().nonempty("Content is required"),
  selectedAddress: z.string().nonempty("Address is required"),
  userId: z.number(),
});

