import { db } from './firebase';
import { collection, doc, getDoc, setDoc, increment } from 'firebase/firestore';

const DEFAULT_DAILY_LIMIT = 50;

interface DailyLimit {
  date: string;
  count: number;
  limit: number;
}

export async function getDailyLimit(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const limitDoc = await getDoc(doc(db, 'emailLimits', today));
  
  if (limitDoc.exists()) {
    return limitDoc.data().limit;
  }
  
  // If no limit is set for today, create one with default value
  await setDoc(doc(db, 'emailLimits', today), {
    date: today,
    count: 0,
    limit: DEFAULT_DAILY_LIMIT
  });
  
  return DEFAULT_DAILY_LIMIT;
}

export async function setDailyLimit(limit: number): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  await setDoc(doc(db, 'emailLimits', today), {
    date: today,
    count: 0,
    limit
  });
}

export async function incrementEmailCount(): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];
  const limitRef = doc(db, 'emailLimits', today);
  const limitDoc = await getDoc(limitRef);
  
  if (!limitDoc.exists()) {
    await setDoc(limitRef, {
      date: today,
      count: 1,
      limit: DEFAULT_DAILY_LIMIT
    });
    return true;
  }
  
  const { count, limit } = limitDoc.data() as DailyLimit;
  
  if (count >= limit) {
    return false;
  }
  
  await setDoc(limitRef, {
    date: today,
    count: increment(1),
    limit
  });
  
  return true;
}

export async function getRemainingEmails(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const limitDoc = await getDoc(doc(db, 'emailLimits', today));
  
  if (!limitDoc.exists()) {
    return DEFAULT_DAILY_LIMIT;
  }
  
  const { count, limit } = limitDoc.data() as DailyLimit;
  return Math.max(0, limit - count);
} 