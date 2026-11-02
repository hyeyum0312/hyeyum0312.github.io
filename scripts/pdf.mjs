// 이력서·포트폴리오 PDF 생성: Jekyll 빌드 → 로컬 서버 → Playwright(Chromium)로 인쇄
// 실행: npm run pdf
// _data/private.yml이 있으면 전화번호 등이 포함된다. 결과물은 pdf/에 생기며 .gitignore 대상이다.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "pdf");
const siteDir = join(outDir, "_site");

const targets = [
  { path: "/resume/", file: "조혜연_프론트엔드_이력서.pdf" },
  { path: "/portfolio/", file: "조혜연_프론트엔드_포트폴리오.pdf" },
];

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

if (!existsSync(join(root, "_data/private.yml"))) {
  console.warn("! _data/private.yml이 없어 전화번호·실명 없이 공개 버전으로 만듭니다.");
}

console.log("Jekyll 빌드 중...");
execFileSync("bundle", ["exec", "jekyll", "build", "--quiet", "--destination", siteDir], {
  cwd: root,
  stdio: "inherit",
});

// 빌드 결과를 루트 경로(/assets/...)가 그대로 동작하도록 서빙한다
const server = createServer((req, res) => {
  let filePath = join(siteDir, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
  if (!filePath.startsWith(siteDir) || !existsSync(filePath)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "Content-Type": types[extname(filePath)] ?? "application/octet-stream" });
  res.end(readFileSync(filePath));
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const { path, file } of targets) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: join(outDir, file),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`✓ pdf/${file}`);
  }
} finally {
  await browser.close();
  server.close();
}
