function generateRobots() {
  const sitemap = document.getElementById("sitemap").value.trim();
  const disallow = document.getElementById("disallow").value.trim() || "/";
  
  let output = "User-agent: *\n";
  output += `Disallow: ${disallow}\n`;
  if (sitemap) {
    output += `Sitemap: ${sitemap}`;
  }

  document.getElementById("output").innerText = output;
}
