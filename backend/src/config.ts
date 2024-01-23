// /src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = {
  credential: {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
  },
  databaseURL: process.env.FIREBASE_DATABASE_URL || '',
};

export const serverConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
};
