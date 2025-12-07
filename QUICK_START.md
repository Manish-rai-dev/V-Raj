# Quick Start - Firebase Setup

## 🚀 5-Minute Setup

### Step 1: Install Firebase
```bash
cd client
npm install firebase
```

### Step 2: Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name: `Viraj Locks`
4. Create project

### Step 3: Enable Authentication
1. Go to **Authentication** → **Get started**
2. Enable:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Phone

### Step 4: Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Start in **test mode**
3. Choose location → **Enable**

### Step 5: Get Firebase Config
1. Click ⚙️ **Project Settings**
2. Scroll to **"Your apps"**
3. Click **Web icon** `</>`
4. Register app → Copy config

### Step 6: Set Environment Variables
Create `client/.env`:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 7: Set Firestore Rules
Go to **Firestore** → **Rules** → Paste:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /contacts/{contactId} {
      allow create: if request.auth != null || request.resource.data.keys().hasAll(['name', 'email', 'phone', 'message']);
      allow read, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```
Click **Publish**

### Step 8: Test
```bash
cd client
npm start
```

1. Go to: http://localhost:3000/login
2. Sign up with email containing "admin" (e.g., `admin@test.com`)
3. Access CRM page
4. Test contact form

## ✅ Done!

**For detailed instructions, see:** `FIREBASE_SETUP_GUIDE.md`

