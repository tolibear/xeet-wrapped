/**
 * Copy text to clipboard
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Check if clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand("copy");
    textArea.remove();
    
    return success;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Generate shareable link for wrapped data
 * @param handle - User handle (optional, used for URL friendliness)
 * @returns Share URL (all links show demo data)
 */
export function generateShareLink(handle?: string): string {
  // Generate a simple, clean slug
  const randomId = Math.random().toString(36).substring(2, 9);
  const year = new Date().getFullYear();
  const slug = handle 
    ? `${year}-wrapped-${handle}-${randomId}`
    : `${year}-wrapped-demo-${randomId}`;
  
  return `${window.location.origin}/share/${slug}`;
}

/**
 * Generate caption for sharing
 * @param handle - User handle
 * @param era - User's era designation
 * @param keyStats - Key statistics to highlight
 * @returns Formatted caption text
 */
export function generateCaption(
  handle: string,
  era: string | undefined,
  keyStats: { label: string; value: string }
): string {
  const eraText = era ? ` • ${era}` : "";
  return `My 2024 on X, wrapped 🎁

${keyStats.label}: ${keyStats.value}${eraText}

See yours at xeet-wrapped.vercel.app/@${handle}`;
}
