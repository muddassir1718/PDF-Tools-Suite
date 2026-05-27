/**
 * Converts a browser File object to a Base64 dataURL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Loads an image via its data URL to fetch its width and height constraints
 */
export function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = (err) => reject(err);
    img.src = dataUrl;
  });
}

/**
 * Loads Mozilla's PDF.js dynamically from CDN to handle browser-side PDF rendering/thumbnails.
 * This completely dynamic injection saves bundle size, prevents worker loading issues in Vite,
 * and remains 100% serverless and client-side safe.
 */
let pdfjsLoadingPromise: Promise<void> | null = null;

export function loadPdfjs(): Promise<void> {
  if (pdfjsLoadingPromise) return pdfjsLoadingPromise;

  pdfjsLoadingPromise = new Promise<void>((resolve, reject) => {
    const win = window as any;
    if (win.pdfjsLib) {
      resolve();
      return;
    }

    const scriptSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    const workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    // Inject styles/scripts
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => {
      if (win.pdfjsLib) {
        win.pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
        resolve();
      } else {
        reject(new Error('PDF.js script loaded but pdfjsLib is undefined'));
      }
    };
    script.onerror = (err) => {
      pdfjsLoadingPromise = null; // enable retry
      reject(err);
    };

    document.head.appendChild(script);
  });

  return pdfjsLoadingPromise;
}
