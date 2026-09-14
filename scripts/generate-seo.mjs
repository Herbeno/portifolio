import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "seo-config.json"), "utf8"));

const siteUrl = (process.env.URL || process.env.DEPLOY_PRIME_URL || config.siteUrl).replace(/\/$/, "");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${config.pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path === "/" ? "/" : page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(root, "robots.txt"), robots);

const htmlFiles = ["index.html", "buscador.html", "ecommerce.html", "petshop.html", "powerbi-ops.html", "aeb.html", "404.html"];

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");
  const configuredUrl = config.siteUrl.replace(/\/$/, "");
  const ogImage = `${siteUrl}${config.ogImage}`;

  content = content.replaceAll("__SITE_URL__", siteUrl);
  content = content.replaceAll("__OG_IMAGE__", ogImage);
  content = content.replaceAll(configuredUrl, siteUrl);
  content = content.replaceAll(`${configuredUrl}${config.ogImage}`, ogImage);
  fs.writeFileSync(filePath, content);
}

console.log(`SEO gerado para: ${siteUrl}`);
