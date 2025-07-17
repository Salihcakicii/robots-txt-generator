const languageSelect = document.getElementById("languageSelect");
const siteNameInput = document.getElementById("siteNameInput");
const rulesContainer = document.getElementById("rulesContainer");
const addRuleBtn = document.getElementById("addRuleBtn");
const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const texts = {
  tr: {
    userAgent: "User-agent",
    disallow: "Disallow",
    allow: "Allow",
    sitemap: "Sitemap",
    siteNamePlaceholder: "Örn: www.example.com",
    addRule: "+ Yeni Kural Ekle",
    copySuccess: "Kopyalandı!",
    copyFail: "Kopyalama başarısız!",
    downloadName: "robots.txt",
  },
  en: {
    userAgent: "User-agent",
    disallow: "Disallow",
    allow: "Allow",
    sitemap: "Sitemap",
    siteNamePlaceholder: "e.g., www.example.com",
    addRule: "+ Add New Rule",
    copySuccess: "Copied!",
    copyFail: "Copy failed!",
    downloadName: "robots.txt",
  },
};

function updatePlaceholders(lang) {
  siteNameInput.placeholder = texts[lang].siteNamePlaceholder;
  addRuleBtn.textContent = texts[lang].addRule;
}

languageSelect.addEventListener("change", () => {
  updatePlaceholders(languageSelect.value);
  generatePreview();
});

function createRuleBlock() {
  const div = document.createElement("div");
  div.className = "rule-block";

  div.innerHTML = `
    <label>${texts[languageSelect.value].userAgent}:</label>
    <input type="text" class="userAgentInput" placeholder="*" value="*" />
    <label>${texts[languageSelect.value].disallow}:</label>
    <input type="text" class="disallowInput" placeholder="/" />
    <label>${texts[languageSelect.value].allow}:</label>
    <input type="text" class="allowInput" placeholder="/" />
    <label>${texts[languageSelect.value].sitemap} (optional):</label>
    <input type="text" class="sitemapInput" placeholder="https://www.example.com/sitemap.xml" />
    <button class="removeRuleBtn">X</button>
  `;

  const removeBtn = div.querySelector(".removeRuleBtn");
  removeBtn.addEventListener("click", () => {
    div.remove();
    generatePreview();
  });

  // Inputlar değişince önizlemeyi güncelle
  div.querySelectorAll("input").forEach(input =>
    input.addEventListener("input", generatePreview)
  );

  return div;
}

addRuleBtn.addEventListener("click", () => {
  rulesContainer.appendChild(createRuleBlock());
});

siteNameInput.addEventListener("input", generatePreview);

function generatePreview() {
  const lang = languageSelect.value;
  const siteName = siteNameInput.value.trim();

  let lines = [];

  if(siteName) {
    lines.push(`# Site: ${siteName}`);
  }

  const ruleBlocks = rulesContainer.querySelectorAll(".rule-block");
  ruleBlocks.forEach(block => {
    const userAgent = block.querySelector(".userAgentInput").value.trim();
    const disallow = block.querySelector(".disallowInput").value.trim();
    const allow = block.querySelector(".allowInput").value.trim();
    const sitemap = block.querySelector(".sitemapInput").value.trim();

    if(userAgent) lines.push(`User-agent: ${userAgent}`);
    if(disallow) lines.push(`Disallow: ${disallow}`);
    if(allow) lines.push(`Allow: ${allow}`);
    if(sitemap) lines.push(`Sitemap: ${sitemap}`);

    lines.push(""); // boş satır
  });

  preview.textContent = lines.join("\n");
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(preview.textContent).then(() => {
    alert(texts[languageSelect.value].copySuccess);
  }).catch(() => {
    alert(texts[languageSelect.value].copyFail);
  });
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([preview.textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = texts[languageSelect.value].downloadName;
  a.click();
  URL.revokeObjectURL(url);
});

// İlk kural bloğu oluştur
rulesContainer.innerHTML = "";
rulesContainer.appendChild(createRuleBlock());
updatePlaceholders(languageSelect.value);
generatePreview();
