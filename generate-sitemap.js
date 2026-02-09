const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://pingmeup.in';
const TODAY = new Date().toISOString().split('T')[0];

// Define all pages with their priority and change frequency
const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    // Add more pages here as you create them
    // { path: '/about', priority: '0.8', changefreq: 'monthly' },
    // { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
    // { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    // { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    // { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

// Generate sitemap XML
function generateSitemap() {
    const urls = pages
        .map(
            (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
        )
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return sitemap;
}

// Write sitemap to public folder
function writeSitemap() {
    const sitemap = generateSitemap();
    const publicDir = path.join(__dirname, 'public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 Location: ${sitemapPath}`);
    console.log(`🌐 URL: ${SITE_URL}/sitemap.xml`);
    console.log(`📄 Pages included: ${pages.length}`);
}

// Run
writeSitemap();
