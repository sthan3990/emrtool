// /src/auth/firebase.ts
import admin from 'firebase-admin';
import { Request } from 'express';

const firebaseConfig = {
  credential: admin.credential.cert(require('../config/firebaseServiceAccountKey.json')),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp(firebaseConfig);

export const authenticateFirebaseToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeFirebaseTokenFromRequest = (req: Request): admin.auth.DecodedIdToken | null => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7);
    try {
      return authenticateFirebaseToken(token);
    } catch (error) {
      return null;
    }
  }

  return null;
};
