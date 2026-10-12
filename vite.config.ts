import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * SEO helper. The real domain isn't known yet, so nothing is guessed:
 * - Without SITE_URL: relative OG image, no canonical, robots.txt without a sitemap.
 * - With SITE_URL (e.g. SITE_URL=https://umerfarooq.dev npm run build): canonical link,
 *   absolute og:url / og:image / JSON-LD image, sitemap.xml and a robots.txt that points to it.
 */
function seo(siteUrl: string | undefined): Plugin {
  const base = siteUrl?.replace(/\/+$/, '')
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      if (!base) return html
      return html
        .replace(/content="\/og-image\.png"/g, `content="${base}/og-image.png"`)
        .replace('"image": "/umer-farooq.jpg"', `"image": "${base}/umer-farooq.jpg", "url": "${base}/"`)
        .replace(
          '<meta property="og:type"',
          `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />\n    <meta property="og:type"`,
        )
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(base ? ['', `Sitemap: ${base}/sitemap.xml`] : [])].join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots + '\n' })
      if (base) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL)],
  }
})
