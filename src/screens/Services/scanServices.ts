import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

import {getAuth} from '@react-native-firebase/auth';

export interface ScanResults {
  status: string;
  stats: {
    malicious: number;
    suspicious: number;
    harmless: number;
    undetected: number;
  };
}

export const saveScanHistory = async (
  url: string,
  results: ScanResults,
): Promise<void> => {
  const user = getAuth().currentUser;

  if (!user) {
    throw new Error('User is not logged in');
  }

  const db = getFirestore();

  await addDoc(
    collection(db, 'users', user.uid, 'scans'),
    {
      url,
      status: results.status,
      stats: results.stats,
      scannedAt: serverTimestamp(),
    },
  );

  console.log('Scan history saved successfully');
};