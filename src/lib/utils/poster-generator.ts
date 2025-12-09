import html2canvas from "html2canvas";

/**
 * Generate poster image from DOM element
 * @param elementId - ID of the element to capture
 * @param aspectRatio - Aspect ratio for the poster (story: 9:16, landscape: 16:9)
 * @returns Promise that resolves to blob URL or null if failed
 */
export async function generatePoster(
  elementId: string,
  aspectRatio: "story" | "landscape" = "story"
): Promise<string | null> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Set dimensions based on aspect ratio
    const dimensions = aspectRatio === "story"
      ? { width: 1080, height: 1920 }
      : { width: 1600, height: 900 };

    // Capture the element
    const canvas = await html2canvas(element, {
      backgroundColor: "#000000",
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      width: dimensions.width,
      height: dimensions.height,
      windowWidth: dimensions.width,
      windowHeight: dimensions.height,
    });

    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(null);
        }
      }, "image/png");
    });
  } catch (error) {
    console.error("Failed to generate poster:", error);
    return null;
  }
}

/**
 * Download poster image
 * @param blobUrl - Blob URL of the image
 * @param filename - Filename for the download
 */
export function downloadPoster(blobUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up blob URL after a short delay
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 100);
}

/**
 * Generate and download poster in one step
 * @param elementId - ID of the element to capture
 * @param aspectRatio - Aspect ratio for the poster
 * @param handle - User handle for filename
 * @returns Promise that resolves to true if successful
 */
export async function generateAndDownloadPoster(
  elementId: string,
  aspectRatio: "story" | "landscape",
  handle: string
): Promise<boolean> {
  try {
    const blobUrl = await generatePoster(elementId, aspectRatio);
    if (!blobUrl) {
      return false;
    }

    const filename = `xeet-wrapped-2024-${handle}-${aspectRatio}.png`;
    downloadPoster(blobUrl, filename);
    return true;
  } catch (error) {
    console.error("Failed to generate and download poster:", error);
    return false;
  }
}
