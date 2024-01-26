import admin from "firebase-admin";
import { createRequire } from "module";
export const initFireAdmin = async () => {
    // Create a require function with the current module
    const require = createRequire(import.meta.url);
    try {
        // Dynamically import the service account JSON file
        const serviceAccount = require("../resources/serviceAccount.json");
        // Initialize Firebase Admin with the service account credentials
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log("Firebase Admin initialized successfully.");
    }
    catch (error) {
        console.error("Error initializing Firebase Admin:", error);
        throw Error;
    }
};
