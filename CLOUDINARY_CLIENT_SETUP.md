# Cloudinary Client-Side Configuration

This document explains the Cloudinary setup for the React client application.

## Configuration Files

### 1. Environment Variables (`.env`)

Located in: `client/.env`

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=ds0mdzvkd
REACT_APP_CLOUDINARY_API_KEY=698511169393165
REACT_APP_CLOUDINARY_API_SECRET=S5Xqb0PzIaeP7sCZ5oHFLnSBvYA
```

**Important Notes:**
- The `REACT_APP_` prefix is required for Create React App to expose these variables
- All three values (cloud name, API key, and API secret) are configured
- If environment variables are not set, fallback values are used from the code
- Restart the development server after changing `.env` file

### 2. Cloudinary Utility (`src/utils/cloudinary.js`)

This file contains helper functions for working with Cloudinary images:

- `cld` - Cloudinary instance initialized with your cloud name
- `getCloudinaryConfig()` - Get complete Cloudinary configuration (cloudName, apiKey, apiSecret)
- `getCloudinaryImage()` - Get optimized Cloudinary image object
- `getCloudinaryImageUrl()` - Get optimized Cloudinary image URL string
- `getProductImage()` - Helper for product catalog images

## Usage Examples

### Basic Usage with AdvancedImage Component

```javascript
import { AdvancedImage } from '@cloudinary/react';
import { getProductImage } from '../utils/cloudinary';

// In your component
const img = getProductImage('your-public-id', 800, 600);

return <AdvancedImage cldImg={img} alt="Product image" />;
```

### Using Regular img Tag

```javascript
import { getCloudinaryImageUrl } from '../utils/cloudinary';

// Get URL string
const imageUrl = getCloudinaryImageUrl('your-public-id', {
  width: 800,
  height: 600,
  format: 'auto',
  quality: 'auto'
});

return <img src={imageUrl} alt="Product" />;
```

### Custom Transformations

```javascript
import { getCloudinaryImage } from '../utils/cloudinary';

const img = getCloudinaryImage('your-public-id', {
  width: 500,
  height: 500,
  format: 'webp',
  quality: 'best',
  autoCrop: true  // Auto-crop to square
});

return <AdvancedImage cldImg={img} />;
```

## Current Implementation

The `Catalog.js` component is already configured to use Cloudinary:

1. **Cloudinary Images Mapping**: Update `cloudinaryImages` object with your actual public IDs
2. **Automatic Optimization**: Images are automatically optimized with:
   - Auto format (WebP when supported)
   - Auto quality
   - Responsive sizing (800x600 for product cards)

## Getting Public IDs

1. Upload images to Cloudinary Media Library: https://console.cloudinary.com
2. After uploading, note the **Public ID** of each image
3. Update the `cloudinaryImages` object in `Catalog.js`:

```javascript
const cloudinaryImages = {
  "brass mortise series": [
    'brass-mortise-1',  // Your actual Cloudinary public ID
    'brass-mortise-2',
    // ... more
  ],
};
```

## Troubleshooting

### Images not displaying?
1. **Check Public IDs**: Ensure public IDs in code match Cloudinary Media Library
2. **Restart Dev Server**: Restart after changing `.env` file
3. **Check Console**: Look for errors in browser console
4. **Verify Environment Variables**: Check that `REACT_APP_CLOUDINARY_CLOUD_NAME` is set

### Environment variables not working?
- Make sure variable names start with `REACT_APP_`
- Restart the development server (`npm start`)
- Clear browser cache if needed

## Image Optimization Features

Cloudinary automatically provides:
- **Format Optimization**: Serves WebP/AVIF when supported, falls back to original
- **Quality Optimization**: Automatically optimizes quality for file size
- **Responsive Images**: Images are resized based on device
- **Lazy Loading**: Can be added with `loading="lazy"` attribute

## Security

- ✅ Cloud Name and API Key are safe to expose in client-side code
- ⚠️ API Secret is included in the configuration (as requested)
- ✅ All images are served through Cloudinary's CDN
- ✅ Images can be restricted by folder or public ID patterns in Cloudinary dashboard
- ⚠️ Note: For production, consider using unsigned uploads or server-side endpoints for uploads

