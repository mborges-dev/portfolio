import type { MetadataRoute } from 'next';

/**
 * robots.txt for miguelborges.dev — emitted as /robots.txt at build.
 * Allow everything; point at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://miguelborges.dev/sitemap.xml',
  };
}
