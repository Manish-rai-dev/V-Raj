import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

/**
 * Cloudinary Configuration
 * Complete setup with cloud name, API key, and API secret
 */
const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET ,
};

/**
 * Initialize Cloudinary instance
 * Uses environment variables from .env file or fallback values
 */
export const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CONFIG.cloudName,
  },
});

/**
 * Get Cloudinary configuration
 * @returns {Object} Cloudinary config with cloudName, apiKey, and apiSecret
 */
export const getCloudinaryConfig = () => {
  return { ...CLOUDINARY_CONFIG };
};

/**
 * Get optimized Cloudinary image URL
 * @param {string} publicId - Cloudinary public ID of the image
 * @param {Object} options - Image transformation options
 * @param {number} options.width - Image width (default: 500)
 * @param {number} options.height - Image height (default: 500)
 * @param {string} options.format - Image format: 'auto', 'jpg', 'png', 'webp' (default: 'auto')
 * @param {string} options.quality - Image quality: 'auto', 'best', 'good', 'eco', 'low' (default: 'auto')
 * @param {boolean} options.autoCrop - Whether to auto-crop to square aspect ratio (default: false)
 * @returns {Object} Cloudinary image object ready for AdvancedImage component
 */
export const getCloudinaryImage = (publicId, options = {}) => {
  const {
    width = 500,
    height = 500,
    format: imgFormat = 'auto',
    quality: imgQuality = 'auto',
    autoCrop = false,
  } = options;

  let image = cld.image(publicId);

  // Apply format optimization
  image = image.format(format(imgFormat));

  // Apply quality optimization
  image = image.quality(quality(imgQuality));

  // Apply resize transformation
  if (autoCrop) {
    // Auto-crop to square aspect ratio
    image = image.resize(
      auto()
        .gravity(autoGravity())
        .width(width)
        .height(height)
    );
  } else {
    // Resize maintaining aspect ratio
    image = image.resize(
      auto()
        .width(width)
        .height(height)
    );
  }

  return image;
};

/**
 * Get Cloudinary image URL as a string (for use with regular img tags)
 * @param {string} publicId - Cloudinary public ID of the image
 * @param {Object} options - Image transformation options (same as getCloudinaryImage)
 * @returns {string} Optimized image URL
 */
export const getCloudinaryImageUrl = (publicId, options = {}) => {
  const image = getCloudinaryImage(publicId, options);
  return image.toURL();
};

/**
 * Helper to create a Cloudinary image configuration for product catalog
 * Optimized for product images with good quality and responsive sizing
 * @param {string} publicId - Cloudinary public ID of the image
 * @param {number} width - Image width (default: 800)
 * @param {number} height - Image height (default: 600)
 * @returns {Object} Cloudinary image object
 */
export const getProductImage = (publicId, width = 800, height = 600) => {
  return getCloudinaryImage(publicId, {
    width,
    height,
    format: 'auto',
    quality: 'auto',
    autoCrop: false,
  });
};

