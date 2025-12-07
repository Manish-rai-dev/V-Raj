/**
 * Utility function to convert Google Drive URLs to direct image URLs
 * Uses Google Drive's thumbnail service which works better for direct access
 * 
 * @param {string} driveUrl - Google Drive URL (format: https://drive.google.com/uc?export=view&id=FILE_ID)
 * @param {string} size - Image size: 'small' (w400), 'medium' (w800), 'large' (w1000), 'xlarge' (w1920)
 * @returns {string|null} - Direct Google Drive image URL or null if invalid
 */
export const getDriveImageUrl = (driveUrl, size = 'large') => {
  // If it's a placeholder, return null
  if (!driveUrl || driveUrl.includes('YOUR_FILE_ID')) {
    return null;
  }
  
  // Extract file ID from Google Drive URL
  const fileId = extractFileId(driveUrl);
  
  if (!fileId) {
    return null;
  }
  
  // Size mapping
  const sizeMap = {
    small: 'w400',
    medium: 'w800',
    large: 'w1000',
    xlarge: 'w1920'
  };
  
  const sz = sizeMap[size] || sizeMap.large;
  
  // Primary method: Direct view URL (works best for publicly shared files)
  // This format is more reliable for displaying images
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
  
  // Alternative formats (commented out, but can be used as fallback):
  // Option 1: Google Drive thumbnail service
  // return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sz}`;
  
  // Option 2: Googleusercontent CDN (requires file to be publicly shared)
  // return `https://lh3.googleusercontent.com/d/${fileId}`;
};

/**
 * Extract file ID from Google Drive URL
 * @param {string} driveUrl - Google Drive URL
 * @returns {string|null} - File ID or null if not found
 */
export const extractFileId = (driveUrl) => {
  if (!driveUrl || typeof driveUrl !== 'string') return null;
  
  // Try different URL formats - order matters, try most specific first
  const patterns = [
    // Pattern 1: Direct link format ?id=FILE_ID or &id=FILE_ID
    /[?&]id=([a-zA-Z0-9_-]+)/,
    // Pattern 2: /file/d/FILE_ID/ or /file/d/FILE_ID/view or /file/d/FILE_ID?...
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    // Pattern 3: /d/FILE_ID/ or /d/FILE_ID/view or /d/FILE_ID?...
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = driveUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Converts a Google Drive share link to a direct image link
 * Handles various Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/uc?export=view&id=FILE_ID (already direct)
 * 
 * IMPORTANT: For images to display, the Google Drive files must be set to 
 * "Anyone with the link can view" in the sharing settings.
 * 
 * @param {string} link - Google Drive share link
 * @returns {string|null} - Direct image link or null if invalid
 */
export const getDirectDriveLink = (link) => {
  // Return null for invalid or placeholder links
  if (!link || typeof link !== 'string') {
    console.warn('getDirectDriveLink: Invalid link provided', link);
    return null;
  }
  
  if (link.includes('YOUR_FILE_ID') || link.includes('placeholder')) {
    return null;
  }
  
  // If it's already a direct link, return it as is
  if (link.includes('drive.google.com/uc?export=view&id=') || 
      link.includes('drive.google.com/thumbnail?id=')) {
    return link;
  }
  
  // Extract file ID from the share link
  const fileId = extractFileId(link);
  
  if (!fileId) {
    console.warn('getDirectDriveLink: Could not extract file ID from', link);
    return null;
  }
  
  // Convert to direct image link format
  // Using thumbnail API which is more reliable for displaying images
  // Format: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
  // IMPORTANT: The file must be set to "Anyone with the link can view" in Google Drive sharing settings
  // Alternative format (if needed): https://drive.google.com/uc?export=view&id=${fileId}
  const directLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  
  return directLink;
};

/**
 * Gets alternative URL formats for a Google Drive file ID (for fallback purposes)
 * @param {string} fileId - Google Drive file ID
 * @returns {Array<string>} - Array of alternative URL formats
 */
export const getAlternativeDriveUrls = (fileId) => {
  if (!fileId) return [];
  
  return [
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];
};

