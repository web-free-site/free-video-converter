# Free Video Converter

Convert local MOV, MKV, WebM, AVI, and other video files to MP4 in your browser.

- **Site:** https://free-video-converter.web-free.site
- **UI base:** [ffmpeg-web](https://github.com/dinoosauro/ffmpeg-web) (MIT, Dinoosauro) — see `LICENSE` / `LICENSE-UPSTREAM`
- **Deploy:** Cloudflare Worker static assets (`wrangler.toml`); do not deploy from this agent run unless configured

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

FFmpeg WebAssembly is loaded at runtime from CDN (`public/ffmpeg-core.json`), not stored in this repository or Worker assets.