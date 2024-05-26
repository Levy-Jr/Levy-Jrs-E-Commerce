import { z } from "zod";

const imageSchema = z.object({ url: z.string(), defaultImage: z.boolean().default(false).optional() }).array()

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
  images: imageSchema
})

export const UpdateProductSchema = CreateProductSchema.extend({
  images: imageSchema.optional()
})