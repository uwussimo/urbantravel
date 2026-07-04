import { revalidatePath } from "next/cache"

// Tours appear on the home page, /tours, tour details and the sitemap
export function revalidatePublicPages() {
  revalidatePath("/", "layout")
  revalidatePath("/sitemap.xml")
}
