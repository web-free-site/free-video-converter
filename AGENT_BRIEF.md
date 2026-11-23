# Cursor agent brief — free-video-converter

Target: https://free-video-converter.web-free.site
Repo name (wrangler `name`): `free-video-converter`
English name: "Free Video Converter". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is a **local-file video converter**, especially MOV / MKV / WebM / AVI → MP4 (and other common video formats). Do not add YouTube, URL, or cloud downloading. Audio-only extraction is already covered by Free Video to MP3 Converter — a discreet link is enough.

## Recommended base (use this)

- Repo: https://github.com/dinoosauro/ffmpeg-web
- License: MIT (keep `LICENSE`, credit ffmpeg-web / Dinoosauro in the footer and on `/about`)
- Stars: 292
- Last commit: 19 Sep 2026, 17:08 Africa/Kigali — `8dee93415f` on `main`
- Official demo: `https://ffmpeg-web.netlify.app/`
- Stack: Svelte + Vite UI for ffmpeg.wasm: convert video (and other media) fully in the browser. Specialize the **home** UX to video format conversion (MOV/MKV/WebM/AVI/MP4). Drop Electron/Docker from the shipped website. **Drop any COEP/COOP shim.** `npm run build` should emit static assets.
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. `LICENSE` is a real MIT file (Copyright (c) 2023 Dinoosauro). Same FFmpeg-core caveat as our other ffmpeg sites.
- Why this one: MIT with a real `LICENSE` file, a complete working converter UI (292 stars, still updated in 2026), already used as a known-good ffmpeg.wasm backup on earlier web-free.site tools.

## Backup (MIT; same upstream we already used for Video to MP3 / Audio Converter)

- Repo: https://github.com/CrypticSignal/av-converter
- License: MIT (LICENSE file, Copyright (c) 2021 GitHub.com/CrypticSignal)
- Stars: 187
- Last commit: 13 Nov 2026, 21:49 Africa/Kigali — `7bc9730578` on `master`
- Official demo: `https://av-converter.com`
- Specialize it to **video** (not audio-only). Do **not** copy the already-branded `web-free-site/free-video-to-mp3`, `free-audio-converter`, or `free-video-compressor` repos (they contain other sites' Adsterra keys).

`souhaildev0/modifio` is MIT (262 stars, Next.js) but needs `output: 'export'` and ships axios + Google Analytics — only a last resort, and you must drop GA.

## Do not use these

- Desktop, Electron-as-the-product, or server-side converters.
- Any tool that downloads video from a URL, or that keeps a YouTube/TikTok downloader.
- Multi-thread `@ffmpeg/core-mt` (COEP/COOP breaks ads).

## FFmpeg core license and file size (mandatory)

The JavaScript wrapper `@ffmpeg/ffmpeg` is MIT. The FFmpeg **WebAssembly cores are often not**.

- Official `@ffmpeg/core@0.12.10` is **GPL-2.0-or-later** on the npm registry. The npm license field on some older tags (including 0.12.6) may say MIT — do not trust that for the `.wasm` binary without checking the core you actually ship.
- Multi-thread cores (`@ffmpeg/core-mt`) need COEP/COOP, which **breaks Adsterra**. Do not use them.
- Gentil allows an **LGPL** ffmpeg.wasm core used as a library. A GPL core is worse.
- Prefer a **single-thread LGPL build** (no `--enable-gpl`, no COEP/COOP). If you cannot produce or obtain a clearly LGPL single-thread core, **STOP before shipping a GPL core** and report what you found, rather than quietly using a CDN `@ffmpeg/core` or `@ffmpeg/core-mt`.
- **Do not put a 25+ MiB `.wasm` file in the Worker assets or the Git repo.** Cloudflare static assets typically cap individual files at 25 MiB. Load the single-thread core at runtime from a public CDN or similar host, show a progress indicator, and cache it in the browser (Cache API or OPFS). Credit FFmpeg and ffmpeg.wasm on `/about`, and keep the license texts that apply to the core you actually ship.
- **Do not set COEP/COOP headers.** Ads will break if you do. Drop any `coi-serviceworker` or similar COOP/COEP shim.

For this site, common video decoders plus an MP4-friendly encoder path are enough. Prefer an LGPL single-thread core. If a usable MP4 encode needs a GPL core, STOP and report that rather than silently shipping GPL or enabling COEP/COOP.

## What to build on top of dinoosauro/ffmpeg-web

1. Import the base into this repo, keep the MIT license, and credit ffmpeg-web / Dinoosauro (and FFmpeg / ffmpeg.wasm). Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them).
2. Rebrand to "Free Video Converter". English primary. No FR/SW translations of the site. The home tool converts local video to MP4 by default, with clear format options (at least MOV, MKV, WebM, AVI, MP4). You may add prerendered format pages (`/mov-to-mp4`, `/mkv-to-mp4`, `/webm-to-mp4`, `/avi-to-mp4`). Link discreetly to Free Video to MP3 (`https://free-video-to-mp3.web-free.site/?ref=video-converter`) and Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=video-converter`) instead of duplicating those products as the primary UX.
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no file upload, no YouTube, no URL import.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not break conversion or download.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-video-converter.web-free.site`; English how-to pages, at least `/mov-to-mp4`, `/mkv-to-mp4`, `/webm-to-mp4`, and `/how-to-convert-video-in-the-browser` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-video-converter.web-free.site`. No French landing page.
6. Footer: credit the upstream project, FFmpeg, and ffmpeg.wasm, and add a link back to the hub `https://web-free.site/?ref=video-converter`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the nine other sites in this batch (50 tools in total). Show **Free Video Converter** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=video-converter`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=video-converter`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=video-converter`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=video-converter`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=video-converter`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=video-converter`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=video-converter`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=video-converter`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=video-converter`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=video-converter`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=video-converter`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=video-converter`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=video-converter`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=video-converter`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=video-converter`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=video-converter`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=video-converter`), Free Meme Generator (`https://free-meme-generator.web-free.site/?ref=video-converter`), Free Color Picker (`https://free-color-picker.web-free.site/?ref=video-converter`), Free GIF Maker (`https://free-gif-maker.web-free.site/?ref=video-converter`), Free Photo Editor (`https://free-photo-editor.web-free.site/?ref=video-converter`), Free Logo Maker (`https://free-logo-maker.web-free.site/?ref=video-converter`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/?ref=video-converter`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=video-converter`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=video-converter`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=video-converter`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=video-converter`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=video-converter`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=video-converter`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=video-converter`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=video-converter`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=video-converter`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=video-converter`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=video-converter`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=video-converter`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=video-converter`), Free Citation Generator (`https://free-citation-generator.web-free.site/?ref=video-converter`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=video-converter`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=video-converter`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=video-converter`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=video-converter`), Free Video to GIF Converter (`https://free-video-to-gif.web-free.site/?ref=video-converter`), Free Audio Converter (`https://free-audio-converter.web-free.site/?ref=video-converter`), **Free Video Converter**.
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=video-converter`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=video-converter`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=video-converter`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=video-converter`).
     - **Time:** Free Time Zone Converter (`https://free-time-zone-converter.web-free.site/?ref=video-converter`).
     - **Drawing:** Free Whiteboard (`https://free-whiteboard.web-free.site/?ref=video-converter`).
     - **Random & pickers:** Free Spin Wheel (`https://free-spin-wheel.web-free.site/?ref=video-converter`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-video-converter"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-video-converter.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally (without COEP/COOP), convert a short WebM or MP4 to another stated format (or WebM to MP4), download and play the result, check mobile at 390px, confirm no file is uploaded and that no URL downloader exists, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, which FFmpeg core you actually shipped (source, license, size, how it is loaded), pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes are not ready yet (sites are not live). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23bplaceholder`). After a browser agent writes real keys to `adsterra-codes.md`, a later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-video-converter.web-free.site — site ID SITE_ID_PENDING
Popunder wf23bplaceholderpopunder00000000
Native Banner wf23bplaceholdernativebanner0000
Smartlink wf23bplaceholdersmartlink0000000
Social Bar wf23bplaceholdersocialbar0000000
468x60 wf23bplaceholderbanner468x600000
160x300 wf23bplaceholderbanner160x300000
320x50 wf23bplaceholderbanner320x500000
300x250 wf23bplaceholderbanner300x250000
160x600 wf23bplaceholderbanner160x600000
728x90 wf23bplaceholderbanner728x900000
