# Firebase Setup Guide - Frontend Only Authentication & CRM

This guide will help you set up Firebase for authentication and CRM data storage. Everything runs on the frontend - no backend database needed!

## 📋 What You'll Set Up

- ✅ Firebase Authentication (Email, Google, Phone)
- ✅ Firestore Database (for CRM contacts)
- ✅ Admin role management
- ✅ Real-time data storage

---

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Click "Add project"** or "Create a project"

3. **Enter project name**: `Viraj Locks` (or your choice)

4. **Google Analytics** (Optional):
   - You can enable or disable Google Analytics
   - For this project, it's optional

5. **Click "Create project"**
   - Wait for project creation (30-60 seconds)

6. **Click "Continue"** when project is ready

---

## Step 2: Enable Authentication

1. **In Firebase Console**, click **"Authentication"** in the left sidebar

2. **Click "Get started"** (if first time)

3. **Enable Sign-in methods**:

   ### Email/Password:
   - Click on **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

   ### Google:
   - Click on **"Google"**
   - Toggle **"Enable"** to ON
   - Enter **Project support email** (your email)
   - Click **"Save"**

   ### Phone:
   - Click on **"Phone"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

---

## Step 3: Create Firestore Database

1. **In Firebase Console**, click **"Firestore Database"** in the left sidebar

2. **Click "Create database"**

3. **Choose mode**:
   - Select **"Start in test mode"** (for development)
   - Click **"Next"**

4. **Choose location**:
   - Select a location closest to you
   - Click **"Enable"**

5. **Wait for database creation** (30-60 seconds)

---

## Step 4: Get Firebase Configuration

1. **In Firebase Console**, click the **gear icon** ⚙️ next to "Project Overview"

2. **Click "Project settings"**

3. **Scroll down to "Your apps"** section

4. **Click the Web icon** `</>` to add a web app

5. **Register app**:
   - App nickname: `Viraj Locks Web`
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **"Register app"**

6. **Copy the Firebase configuration**:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

7. **Click "Continue to console"**

---

## Step 5: Set Up Environment Variables

1. **Create/Edit** `client/.env` file in your project

2. **Add Firebase configuration**:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key-here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

3. **Replace values** with your actual Firebase config values

4. **Save the file**

---

## Step 6: Set Up Firestore Security Rules

1. **In Firebase Console**, go to **"Firestore Database"**

2. **Click "Rules" tab**

3. **Replace the rules** with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection - users can read their own data, admins can read all
       match /users/{userId} {
         allow read: if request.auth != null && (request.auth.uid == userId || 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
         allow write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Contacts collection - public write, admin read/write
       match /contacts/{contactId} {
         allow create: if request.auth != null || request.resource.data.keys().hasAll(['name', 'email', 'phone', 'message']);
         allow read, update, delete: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
   ```

4. **Click "Publish"**

---

## Step 7: Install Firebase Dependencies

In your project root (`client` folder), run:

```bash
cd client
npm install firebase
```

Or if you're in the root:

```bash
npm install firebase --prefix client
```

---

## Step 8: Test the Setup

1. **Start your application**:
   ```bash
   cd client
   npm start
   ```

2. **Go to**: http://localhost:3000/login

3. **Test Email Sign Up**:
   - Use an email containing "admin" (e.g., `admin@test.com`)
   - Create an account
   - You should be logged in

4. **Test CRM Access**:
   - Click "CRM" in navbar (should be visible for admin)
   - You should see the CRM page

5. **Test Contact Form**:
   - Go to http://localhost:3000/contact
   - Submit the form
   - Check CRM - the contact should appear

---

## Step 9: Admin Role Management

### How Admin Works:

- Users with emails containing **"admin"** or ending with **"@admin.com"** are automatically assigned admin role
- Admin users can:
  - Access CRM page
  - View all contacts
  - Edit/Delete contacts

### Manual Admin Assignment:

If you need to manually make a user admin:

1. **Go to Firebase Console** → **Firestore Database**

2. **Find the user** in `users` collection

3. **Edit the document**:
   - Change `role` field from `"user"` to `"admin"`

---

## 🔒 Security Rules Explained

### Users Collection:
- Users can read their own data
- Admins can read all user data
- Users can only write their own data

### Contacts Collection:
- Anyone can create contacts (for contact form)
- Only admins can read, update, or delete contacts

---

## 📱 Phone Authentication Setup (Optional)

If you want to use phone authentication:

1. **In Firebase Console** → **Authentication** → **Sign-in method**

2. **Enable Phone** provider

3. **For production**, you may need to:
   - Set up reCAPTCHA verification
   - Configure app verification (for mobile apps)

4. **For web**, reCAPTCHA is handled automatically

---

## 🎯 Quick Reference

### Firebase Console URLs:
- **Project Dashboard**: https://console.firebase.google.com/
- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT/authentication
- **Firestore**: https://console.firebase.google.com/project/YOUR_PROJECT/firestore

### Environment Variables:
```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Admin Emails:
- Must contain "admin" or end with "@admin.com"
- Examples: `admin@test.com`, `john.admin@gmail.com`

---

## 🆘 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables are set correctly
- Restart the development server after changing `.env`

### "Permission denied" in Firestore
- Check Firestore security rules
- Make sure user is authenticated
- Verify admin role is set correctly

### Google Login not working
- Check that Google sign-in method is enabled
- Verify Firebase config is correct
- Check browser console for errors

### Phone login not working
- Make sure Phone sign-in method is enabled
- Check phone number format (include country code)
- Verify reCAPTCHA is working

### Contacts not appearing in CRM
- Check Firestore security rules
- Verify user has admin role
- Check browser console for errors
- Verify contact was saved to Firestore (check Firebase Console)

---

## ✅ Setup Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email, Google, Phone)
- [ ] Firestore database created
- [ ] Firebase config copied
- [ ] Environment variables set in `client/.env`
- [ ] Firestore security rules configured
- [ ] Firebase package installed (`npm install firebase`)
- [ ] Tested email signup
- [ ] Tested admin access
- [ ] Tested contact form
- [ ] Tested CRM functionality

---

## 🎉 You're Done!

Your Firebase setup is complete! The application now uses:
- ✅ Firebase Authentication (no backend needed)
- ✅ Firestore for CRM data (no MongoDB needed)
- ✅ Real-time data storage
- ✅ Admin role management

**Next Steps:**
1. Test all authentication methods
2. Test CRM functionality
3. Deploy to production (update Firebase config for production domain)

---

## 📚 Additional Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Documentation**: https://firebase.google.com/docs/firestore
- **Firebase Auth Documentation**: https://firebase.google.com/docs/auth

---

**Need help?** Check the troubleshooting section or Firebase documentation.

