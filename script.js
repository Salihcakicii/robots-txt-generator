const cmsSelect = document.getElementById("cmsSelect");
const loadTemplateBtn = document.getElementById("loadTemplateBtn");
const robotsTextarea = document.getElementById("robotsTextarea");
const validationMessage = document.getElementById("validationMessage");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const languageSelect = document.getElementById("languageSelect");

const templates = {
  wordpress:
`User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Sitemap: https://www.example.com/sitemap.xml`,

  joomla:
`User-agent: *
Disallow: /administrator/
Disallow: /cache/
Disallow: /cli/
Disallow: /components/
Disallow: /includes/
Disallow: /installation/
Disallow: /language/
Disallow: /libraries/
Disallow: /logs/
Disallow: /modules/
Disallow: /plugins/
Disallow: /templates/
Disallow: /tmp/`,

  drupal:
`User-agent: *
Disallow: /core/
Disallow: /modules/
Disallow: /profiles/
Disallow: /scripts/
Disallow: /themes/
Sitemap: https://www.example.com/sitemap.xml`
};

const texts = {
  tr: {
    loadTemplate: "Şablon yüklendi.",
    validationSuccess: "✅ robots.txt geçerli görünüyor.",
    validationFail: "⚠️ robots.txt içinde hatalar bulunuyor.",
    copySuccess: "robots.txt içeriği kopyalandı!",
    copyFail: "Kopyalama başarısız oldu!",
    downloadName: "robots.txt",
    emptyContent: "Lütfen içerik girin.",
  },
  en: {
    loadTemplate: "Template loaded.",
    validationSuccess: "✅ robots.txt looks valid.",
    validationFail: "⚠️ There are errors in robots.txt.",
    copySuccess: "robots.txt content copied!",
    copyFail: "Copy failed!",
    downloadName: "robots.txt",
    emptyContent: "Please enter content.",
  },
};

function updateLanguage() {
  const lang = languageSelect.value;
  validationMessage.textContent = "";
}
languageSelect.addEventListener("change", updateLanguage);
updateLanguage();

loadTemplateBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  const selected = cmsSelect.value;
  if (!selected) return;
  robotsTextarea.value = templates[selected];
  validationMessage.textContent = texts[lang].loadTemplate;
  validateRobots(robotsTextarea.value);
});

function validateRobots(text) {
  const lang = languageSelect.value;
  if (!text.trim()) {
    validationMessage.textContent = texts[lang].emptyContent;
    validationMessage.style.color = "red";
    return false;
  }

  // Basit doğrulama: User-agent satırı en az bir tane olmalı
  const userAgentCount = (text.match(/User-agent:/gi) || []).length;
  if (userAgentCount === 0) {
    validationMessage.textContent = texts[lang].validationFail + " (User-agent yok)";
    validationMessage.style.color = "red";
    return false;
  }

  // Daha detaylı kurallar kontrolü yapılabilir

  validationMessage.textContent = texts[lang].validationSuccess;
  validationMessage.style.color = "green";
  return true;
}

robotsTextarea.addEventListener("input", () => {
  validateRobots(robotsTextarea.value);
});

copyBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  if (!robotsTextarea.value.trim()) return alert(texts[lang].emptyContent);
  navigator.clipboard.writeText(robotsTextarea.value).then(() => {
    alert(texts[lang].copySuccess);
  }).catch(() => {
    alert(texts[lang].copyFail);
  });
});

downloadBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  if (!robotsTextarea.value.trim()) return alert(texts[lang].emptyContent);
  const blob = new Blob([robotsTextarea.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = texts[lang].downloadName;
  a.click();
  URL.revokeObjectURL(url);
});
