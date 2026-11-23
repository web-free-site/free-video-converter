import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-video-converter.web-free.site';
const dist = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const pages = [
  {
    path: '/mov-to-mp4',
    title: 'MOV to MP4 — Free browser converter',
    description: 'Convert QuickTime MOV files to MP4 online without uploading. Local FFmpeg in your browser.',
    h1: 'MOV to MP4 converter',
    snippet:
      '<p>Turn MOV into MP4 on your computer. Pick a file, convert, and download — nothing is uploaded.</p>',
  },
  {
    path: '/mkv-to-mp4',
    title: 'MKV to MP4 — Free online converter',
    description: 'Convert Matroska MKV video to MP4 in the browser. No server upload.',
    h1: 'MKV to MP4 converter',
    snippet: '<p>Convert MKV containers to MP4 for wider device compatibility.</p>',
  },
  {
    path: '/webm-to-mp4',
    title: 'WebM to MP4 — Free browser converter',
    description: 'Convert WebM video to MP4 locally using FFmpeg WebAssembly.',
    h1: 'WebM to MP4 converter',
    snippet: '<p>Save WebM recordings as MP4 without leaving your browser.</p>',
  },
  {
    path: '/avi-to-mp4',
    title: 'AVI to MP4 — Free video converter',
    description: 'Convert legacy AVI files to modern MP4 online. Files stay on your device.',
    h1: 'AVI to MP4 converter',
    snippet: '<p>Re-mux or re-encode AVI into MP4 for phones and editors.</p>',
  },
  {
    path: '/how-to-convert-video-in-the-browser',
    title: 'How to convert video in the browser',
    description:
      'Step-by-step guide to convert MOV, MKV, WebM, and AVI to MP4 without uploading your files.',
    h1: 'How to convert video in the browser',
    snippet:
      '<ol><li>Open the converter and add a video from your device.</li><li>Keep MP4 as the output and adjust quality if needed.</li><li>Start conversion and download when FFmpeg finishes.</li></ol>',
    jsonLd:
      '{"@context":"https://schema.org","@type":"Article","headline":"How to convert video in the browser","description":"Convert MOV, MKV, WebM, and AVI to MP4 without upload.","inLanguage":"en","mainEntityOfPage":"https://free-video-converter.web-free.site/how-to-convert-video-in-the-browser","author":{"@type":"Organization","name":"web-free.site","url":"https://web-free.site/"},"publisher":{"@type":"Organization","name":"web-free.site","url":"https://web-free.site/"}}',
  },
  {
    path: '/about',
    title: 'About — Free Video Converter',
    description: 'Credits for ffmpeg-web, FFmpeg, ffmpeg.wasm core licensing, and privacy.',
    h1: 'About this converter',
    snippet:
      '<p>UI based on <a href="https://github.com/dinoosauro/ffmpeg-web">ffmpeg-web</a> (MIT). FFmpeg WebAssembly core is loaded from CDN at runtime; see manifest at <code>/ffmpeg-core.json</code>.</p>',
  },
  {
    path: '/privacy',
    title: 'Privacy policy — Free Video Converter',
    description: 'Privacy policy for Free Video Converter on web-free.site.',
    h1: 'Privacy policy',
    snippet:
      '<p>Video files are processed locally in your browser. We do not receive your media. Cloudflare Web Analytics and ad partners may collect standard web metrics as described on web-free.site.</p>',
  },
  {
    path: '/terms',
    title: 'Terms of use — Free Video Converter',
    description: 'Terms for using the Free Video Converter.',
    h1: 'Terms of use',
    snippet: '<p>Use this tool only on files you have the right to convert. The service is provided as-is.</p>',
  },
  {
    path: '/contact',
    title: 'Contact — Free Video Converter',
    description: 'How to reach the maintainers.',
    h1: 'Contact',
    snippet:
      '<p>Questions via the <a href="https://web-free.site/?ref=video-converter">web-free.site</a> hub or GitHub issues on the site repository.</p>',
  },
];

function buildPage(page) {
  const url = HOST + page.path;
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${page.title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  if (page.jsonLd) {
    html = html.replace('</head>', `<script type="application/ld+json">${page.jsonLd}</script>\n  </head>`);
  }
  html = html.replace('<div id="app"></div>', `${seoBlock}\n  <div id="app"></div>`);
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page));
}

console.log('Prerendered', pages.length, 'SEO HTML shells into dist/');