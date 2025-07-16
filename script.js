const disallowInput = document.getElementById("disallowInput");
const sitemapInput = document.getElementById("sitemapInput");
const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("outputBox");
const copyBtn = document.getElementById("copyBtn");

generateBtn.addEventListener("click", () => {
  const disallows = disallowInput.value.split(',').map(item => item.trim()).filter(Boolean);
  const sitemap = sitemapInput.value.trim();

  let result = "User-agent: *\n";

  disallows.forEach(path => {
    result += `Disallow: ${path}\n`;
  });

  if (sitemap) {
    result += `Sitemap: ${sitemap}`;
  }

  outputBox.textContent = result;
  outputBox.style.display = "block";
  copyBtn.style.display = "inline-block";
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputBox.textContent).then(() => {
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      copyBtn.textContent = "Kopyala";
    }, 1500);
  });
});
