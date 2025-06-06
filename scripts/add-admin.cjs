const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Validate environment variables
const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();
const auth = getAuth();

async function addAdmin() {
  try {
    console.log('Adding admin user...');
    const user = await auth.getUserByEmail('devoura.agency@gmail.com');
    console.log('Found user:', user.email);

    await db.collection('admins').doc(user.uid).set({
      email: 'devoura.agency@gmail.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin user added successfully!');
  } catch (error) {
    console.error('Error adding admin user:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.error('User not found. Please make sure the email is correct and the user exists in Firebase Authentication.');
    }
  } finally {
    process.exit();
  }
}

addAdmin(); 