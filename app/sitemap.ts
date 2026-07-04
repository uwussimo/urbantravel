import type { MetadataRoute } from "next"

import { getActiveTours } from "@/lib/tour-store"

const BASE_URL = "https://urban-travel.uz"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getActiveTours()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/links`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL}/tours/${tour.slug}`,
    lastModified: tour.updatedAt ? new Date(tour.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...tourRoutes]
}
