import html2canvas from "html2canvas";

/**
 * Ensure all fonts are loaded before capturing
 */
async function ensureFontsLoaded(): Promise<void> {
  try {
    // Wait for all fonts to be ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Additional small delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
  } catch (error) {
    // Font loading check failed, continue anyway
    console.warn("Font loading check failed:", error);
  }
}

/**
 * Generate poster image from DOM element
 * @param elementId - ID of the element to capture
 * @param aspectRatio - Aspect ratio for the poster (story: 9:16, landscape: 16:9)
 * @param retryCount - Number of retries if capture fails
 * @returns Promise that resolves to blob URL or null if failed
 */
export async function generatePoster(
  elementId: string,
  aspectRatio: "story" | "landscape" = "story",
  retryCount: number = 1
): Promise<string | null> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Ensure fonts are loaded
    await ensureFontsLoaded();

    // Set dimensions based on aspect ratio
    const dimensions = aspectRatio === "story"
      ? { width: 1080, height: 1920 }
      : { width: 1600, height: 900 };

    // Capture the element with enhanced quality settings
    const canvas = await html2canvas(element, {
      backgroundColor: "#000000",
      scale: 3, // Higher quality for sharper images
      useCORS: true,
      allowTaint: true,
      width: dimensions.width,
      height: dimensions.height,
      windowWidth: dimensions.width,
      windowHeight: dimensions.height,
      logging: false, // Disable console logging
      imageTimeout: 15000, // Longer timeout for images
      onclone: (clonedDoc) => {
        // Ensure cloned document has proper styling
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Force hardware acceleration off for better rendering
          clonedElement.style.transform = "translateZ(0)";
        }
      },
    });

    // Convert to blob with quality settings
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(null);
        }
      }, "image/png", 1.0); // Maximum quality
    });
  } catch (error) {
    console.error("Failed to generate poster:", error);
    
    // Retry if we have retries left
    if (retryCount > 0) {
      console.log(`Retrying poster generation (${retryCount} attempts remaining)...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return generatePoster(elementId, aspectRatio, retryCount - 1);
    }
    
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
 * @returns Promise that resolves to true if successful, false with error message if failed
 */
export async function generateAndDownloadPoster(
  elementId: string,
  aspectRatio: "story" | "landscape",
  handle: string
): Promise<boolean> {
  try {
    const blobUrl = await generatePoster(elementId, aspectRatio, 2);
    if (!blobUrl) {
      // User-friendly error handling
      console.error("Poster generation failed: Could not create image");
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

/**
 * Get error message for poster generation failures
 */
export function getPosterErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("not found")) {
      return "Could not find the poster preview. Please try again.";
    }
    if (error.message.includes("timeout")) {
      return "Poster generation timed out. Please try again.";
    }
  }
  return "Failed to generate poster. Please try again.";
}
