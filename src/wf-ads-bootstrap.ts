/** Loads banner iframes from public/ads.json (Adsterra placeholders). */
type BannerDef = { key: string; width: number; height: number };
type AdsConfig = {
  enabled: boolean;
  bannerScriptBase?: string;
  banners?: Record<string, BannerDef>;
  slots?: Record<string, string>;
};

const DEFAULT_BANNER_BASE = 'https://bauval.org/22';

function iframeSrcDoc(key: string, width: number, height: number, scriptBase: string): string {
  const atOptions = JSON.stringify({ key, format: 'iframe', height, width, params: {} });
  const src = `${scriptBase.replace(/\/$/, '')}/${key}`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:transparent"><script>var atOptions=${atOptions};<\/script><script src="${src}"><\/script></body></html>`;
}

async function mountSlots() {
  let resolved: AdsConfig = { enabled: false };
  try {
    const res = await fetch('/ads.json');
    resolved = (await res.json()) as AdsConfig;
  } catch {
    return;
  }
  if (!resolved.enabled) return;
  const base = resolved.bannerScriptBase || DEFAULT_BANNER_BASE;
  document.querySelectorAll<HTMLElement>('[data-ad-slot]').forEach(el => {
    const slot = el.getAttribute('data-ad-slot') || '';
    const mapped = resolved.slots?.[slot] ?? slot;
    const def = resolved.banners?.[mapped];
    if (!def?.key) return;
    const iframe = document.createElement('iframe');
    iframe.title = 'Advertisement';
    iframe.width = String(def.width);
    iframe.height = String(def.height);
    iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
    iframe.srcdoc = iframeSrcDoc(def.key, def.width, def.height, base);
    el.appendChild(iframe);
  });
}

mountSlots();