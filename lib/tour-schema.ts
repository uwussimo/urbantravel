import { z } from "zod"

const l10n = z.object({ ru: z.string(), uz: z.string() })
const l10nRequired = z.object({
  ru: z.string().min(1),
  uz: z.string().min(1),
})
const l10nList = z.object({
  ru: z.array(z.string().min(1)),
  uz: z.array(z.string().min(1)),
})

export const tourInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Только строчные буквы, цифры и дефисы"),
  status: z.enum(["active", "archived"]),
  title: l10nRequired,
  route: l10nRequired,
  dates: l10n,
  durationDays: z.number().int().positive().optional(),
  durationNights: z.number().int().nonnegative().optional(),
  priceFrom: z.number().positive().optional(),
  priceIsFrom: z.boolean().optional(),
  priceNote: l10n.optional(),
  departures: l10nList.optional(),
  photos: z.array(z.string().min(1)).max(24),
  highlights: l10nList,
  included: l10nList.optional(),
  notIncluded: l10nList.optional(),
  content: l10nRequired,
})

export type TourInput = z.infer<typeof tourInputSchema>
