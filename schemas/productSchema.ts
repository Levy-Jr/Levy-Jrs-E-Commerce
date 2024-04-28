import { z } from "zod";

const fileSchema = z.custom<File>()
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

export const CreateProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  desc: z.string().min(1, {
    message: "Product description is required"
  }),
  price: z.coerce.number().min(1, {
    message: "Price is required"
  }),
  categoryId: z.string().min(1, {
    message: "Category is required"
  }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  image: imageSchema.refine(file => file.size > 0, "Required")
})