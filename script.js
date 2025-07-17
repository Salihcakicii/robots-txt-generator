document.getElementById("generateBtn").addEventListener("click", function () {
  const userAgent = document.getElementById("userAgent").value;
  const disallow = document.getElementById("disallow").value.split(",").map(d => d.trim());
  const allowAll = document.getElementById("allowAll").checked;
  const sitemap = document.getElementById("sitemap").value.trim();

  let lines = [`User-agent: ${userAgent}`];

  if (allowAll) {
    lines.push("Disallow:");
  } else {
    disallow.forEach(path => {
      if (path) lines.push(`Disallow: ${path}`);
    });
  }

  if (sitemap) {
    lines.push(`Sitemap: ${sitemap}`);
  }

  document.getElementById("result").textContent = lines.join("\n");
});

function copyToClipboard() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Kopyalandı!");
  });
}
