# Cloudinary Image Fix - Troubleshooting & Setup

## The Problem
Image URL shows: `https://online-store-yawo.onrender.com/products/Atta.image`
This is a relative path being served from your backend (not Cloudinary).

## Root Causes & Solutions

### ✅ Step 1: Verify Cloudinary Credentials on Render
1. Go to https://dashboard.render.com
2. Select your backend service
3. Go to **Environment** tab  
4. Check these variables exist:
   - `CLOUDINARY_CLOUD_NAME` = `dtgjpsion`
   - `CLOUDINARY_API_KEY` = `595998697784913`
   - `CLOUDINARY_API_SECRET` = `Fh7H3k64JL34aIRFvNXZ7e9ChRo`

If missing, add them now and Redeploy.

### ✅ Step 2: Delete Old Products from Database
Old products were saved with local file paths BEFORE the Cloudinary fix.

1. Go to Django Admin: `https://online-store-yawo.onrender.com/admin/`
2. Login with your Django superuser account
3. Click **Products**
4. **Delete ALL existing products** (they have wrong image paths)
5. Click **Categories** and verify categories still exist

### ✅ Step 3: After Deploying the Updated Code
Once Render finishes deploying the new code:

1. **Upload a NEW test product** via your Add Product form/API
2. **Open browser DevTools** (F12) → Console tab
3. **Look for this debug log:**
   ```
   Product "ProductName" image: https://res.cloudinary.com/dtgjpsion/image/upload/v...
   ```
   - If you see this → ✅ Cloudinary upload working!
   - If you see `/products/` path → ❌ Still uploading locally

### ✅ Step 4: Check Backend Logs
The backend now has logging. Check Render logs:

1. Go to your Render service
2. Click **Logs** tab
3. Upload a product and look for:
   ```
   INFO:root:Uploading image: filename.jpg
   INFO:root:Cloudinary upload successful: https://res.cloudinary.com/...
   INFO:root:Saving product with image: https://res.cloudinary.com/...
   INFO:root:Product saved successfully
   ```

### ❌ If You See These Errors:

**Error: "Cloudinary upload failed: Invalid credentials"**
- Cloudinary credentials on Render are wrong
- Verify them in Render dashboard

**Error: "No image file in request"**
- Your frontend isn't sending the image file
- Check your Add Product component is using multipart/form-data

**Error: "Category not found"**
- You deleted all products including categories
- Create categories first in Django admin

## Expected Workflow

1. ✅ Backend receives image + product data
2. ✅ Backend uploads image to Cloudinary
3. ✅ Backend stores Cloudinary HTTPS URL in database
4. ✅ API returns Cloudinary URL to frontend
5. ✅ Frontend receives full HTTPS URL (starts with https://res.cloudinary.com)
6. ✅ Frontend displays image directly
7. ✅ Image shows on page!

## Quick Checklist

- [ ] Cloudinary credentials added to Render environment variables
- [ ] Render has redeployed after code update
- [ ] OLD products deleted from database
- [ ] NEW product uploaded after deployment
- [ ] Browser console shows correct Cloudinary URL
- [ ] Backend logs show successful upload
- [ ] Image displays on frontend

If you completed all steps and image still doesn't show:
- Check browser console for CORS errors (shouldn't be any)
- Check image was actually uploaded to Cloudinary dashboard
- Try a different image format (jpg/png instead of webp)
