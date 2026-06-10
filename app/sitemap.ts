import type { MetadataRoute } from 'next';

/**
 * Sitemap for miguelborges.dev — emitted as /sitemap.xml at build.
 *
 * Single-page site: only the root URL is listed. When sub-routes get
 * added later (e.g. a /blog/[slug] tree), add them here so Google
 * Search Console picks them up.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://miguelborges.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
