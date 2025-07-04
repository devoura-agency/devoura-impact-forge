import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Export the Express API
export default app;

// For Vercel serverless functions
export const config = {
  api: {
    bodyParser: true,
  },
}; 