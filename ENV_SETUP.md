# Environment Variables Setup

## ✅ Firebase Credentials Configured

Your Firebase credentials have been set up. To use them, you need to create a `.env` file in the `client` folder.

## 📝 Create `.env` File

1. **Navigate to the `client` folder**

2. **Create a file named `.env`** (not `.env.txt`)

3. **Add the following content**:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyAy9-eODiqtbf4bWDnZmn8XTNkKki-UgGs
REACT_APP_FIREBASE_AUTH_DOMAIN=v-raj-baf41.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=v-raj-baf41
REACT_APP_FIREBASE_STORAGE_BUCKET=v-raj-baf41.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=724297673716
REACT_APP_FIREBASE_APP_ID=1:724297673716:web:b3baa38e4a0131ede5e7a1
REACT_APP_FIREBASE_MEASUREMENT_ID=G-FXQR5CQCM5

# Cloudinary Configuration (if using Cloudinary - optional)
REACT_APP_CLOUDINARY_CLOUD_NAME=
REACT_APP_CLOUDINARY_API_KEY=
REACT_APP_CLOUDINARY_API_SECRET=
```

4. **Save the file**

## ⚠️ Important Notes

- The `.env` file is already in `.gitignore` to protect your credentials
- **Never commit** the `.env` file to version control
- Restart your development server after creating/updating `.env`
- All variables must start with `REACT_APP_` to be accessible in React

## 🚀 After Setup

1. **Restart your development server**:
   ```bash
   cd client
   npm start
   ```

2. **Verify it's working**:
   - Check browser console for any Firebase errors
   - Try logging in at http://localhost:3000/login

## 🔒 Security

- ✅ Credentials are stored in `.env` (not in code)
- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ Environment variables are used in `firebase.js`

## 📍 File Location

```
client/
  ├── .env          ← Create this file here
  ├── .gitignore    ← Already configured to ignore .env
  └── src/
      └── config/
          └── firebase.js  ← Reads from .env
```

---

**Your Firebase configuration is ready! Just create the `.env` file with the credentials above.**

