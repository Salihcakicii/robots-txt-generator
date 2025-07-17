function generateRobots() {
  const userAgent = document.getElementById("userAgent").value.trim();
  const allowPaths = document.getElementById("allowPaths").value.trim().split("\n").filter(line => line !== "");
  const disallowPaths = document.getElementById("disallowPaths").value.trim().split("\n").filter(line => line !== "");
  const sitemap = document.getElementById("sitemap").value.trim();

  let result = `User-agent: ${userAgent}\n`;

  disallowPaths.forEach(path => {
    result += `Disallow: ${path}\n`;
  });

  allowPaths.forEach(path => {
    result += `Allow: ${path}\n`;
  });

  if (sitemap) {
    result += `\nSitemap: ${sitemap}`;
  }

  document.getElementById("output").value = result;
}

function copyToClipboard() {
  const output = document.getElementById("output");
  output.select();
  output.setSelectionRange(0, 99999); // mobil uyumlu kopyalama
  document.execCommand("copy");
  alert("Kopyalandı!");
}
