function generateRobots() {
  const userAgent = document.getElementById("userAgent").value.trim();
  const disallow = document.getElementById("disallow").value.trim();
  const allow = document.getElementById("allow").value.trim();
  const sitemap = document.getElementById("sitemap").value.trim();
  const crawlDelay = document.getElementById("crawlDelay").value.trim();

  let lines = [];

  if (userAgent) lines.push(`User-agent: ${userAgent}`);
  if (disallow) lines.push(`Disallow: ${disallow}`);
  if (allow) lines.push(`Allow: ${allow}`);
  if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
  if (sitemap) lines.push(`Sitemap: ${sitemap}`);

  if (lines.length === 0) {
    lines.push('# Lütfen en az bir alanı doldurun.');
  }

  document.getElementById("output").textContent = lines.join("\n");
}
