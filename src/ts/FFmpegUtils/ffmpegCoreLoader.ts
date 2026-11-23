/**
 * Runtime manifest for the single-thread @ffmpeg/core build (no SharedArrayBuffer).
 */
export interface FfmpegCoreManifest {
  license: string;
  description: string;
  coreJsUrl: string;
  coreWasmUrl: string;
  workerJsUrl?: string;
  wasmBytes?: number;
  fallbackWasmBytes?: number;
}

let manifestPromise: Promise<FfmpegCoreManifest> | null = null;

export function loadFfmpegCoreManifest(): Promise<FfmpegCoreManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch('/ffmpeg-core.json', { cache: 'no-cache' }).then(r => {
      if (!r.ok) throw new Error('Could not load /ffmpeg-core.json');
      return r.json() as Promise<FfmpegCoreManifest>;
    });
  }
  return manifestPromise;
}