import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Validate environment variables
const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);
const auth = getAuth(app);

async function addAdmin() {
  try {
    console.log('Adding admin user...');
    
    // First, get the user by email
    const user = await auth.getUserByEmail('devoura.agency@gmail.com');
    console.log('Found user:', user.email);
    
    // Add the user to the admins collection
    await db.collection('admins').doc(user.uid).set({
      email: 'devoura.agency@gmail.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin user added successfully!');
  } catch (error: any) {
    console.error('Error adding admin user:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.error('User not found. Please make sure the email is correct and the user exists in Firebase Authentication.');
    }
  } finally {
    process.exit();
  }
}

addAdmin(); 