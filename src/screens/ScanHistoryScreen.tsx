import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {getAuth} from '@react-native-firebase/auth';

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';

interface ScanItem {
  id: string;
  url: string;
  status: string;
  stats: {
    malicious: number;
    suspicious: number;
    harmless: number;
    undetected: number;
  };
  scannedAt?: any;
}

interface Props {
  onBack: () => void;
}

export default function ScanHistoryScreen({onBack}: Props) {
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const user = getAuth().currentUser;

        if (!user) {
          setError('Please login to view scan history.');
          return;
        }

        const db = getFirestore();

        const scansRef = collection(
          db,
          'users',
          user.uid,
          'scans',
        );

        const scansQuery = query(
          scansRef,
          orderBy('scannedAt', 'desc'),
        );

        const snapshot = await getDocs(scansQuery);

        const history: ScanItem[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<ScanItem, 'id'>),
        }));

        setScans(history);
      } catch (err) {
        console.log('History error:', err);
        setError('Unable to load scan history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Scan History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#60A5FA" />
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : scans.length === 0 ? (
        <Text style={styles.message}>No scan history found.</Text>
      ) : (
        <ScrollView>
          {scans.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.url}>{item.url}</Text>

              <Text style={styles.status}>
                Status: {item.status}
              </Text>

              <Text style={styles.details}>
                Malicious: {item.stats?.malicious ?? 0}
              </Text>

              <Text style={styles.details}>
                Suspicious: {item.stats?.suspicious ?? 0}
              </Text>

              <Text style={styles.details}>
                Harmless: {item.stats?.harmless ?? 0}
              </Text>

              <Text style={styles.details}>
                Undetected: {item.stats?.undetected ?? 0}
              </Text>

              <Text style={styles.date}>
                Scanned: {item.scannedAt?.toDate
                  ? item.scannedAt.toDate().toLocaleString()
                  : 'Date unavailable'}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 20,
  },
  back: {
    color: '#60A5FA',
    fontSize: 17,
    marginBottom: 20,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#172033',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  url: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },
  details: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 10,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 20,
  },
});