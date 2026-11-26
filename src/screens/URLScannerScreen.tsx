import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {saveScanHistory} from './Services/scanServices';
import type {ScanResults} from './Services/scanServices';

interface Props {
  onBack: () => void;
  onScanComplete: (url: string, results: ScanResults) => void;
}

const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export default function URLScannerScreen({
  onBack,
  onScanComplete,
}: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    const validUrl = url.trim();

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(validUrl);

      if (
        !['http:', 'https:'].includes(parsedUrl.protocol)
      ) {
        throw new Error('Invalid protocol');
      }
    } catch {
      Alert.alert(
        'Invalid URL',
        'Enter a valid URL starting with https:// or http://',
      );
      return;
    }

    setLoading(true);

    try {
      // Submit URL to CyberShield backend
      const scanResponse = await fetch(
        'http://10.0.2.2:5000/scan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({url: validUrl}),
        },
      );

      const scanText = await scanResponse.text();
      const scanData = JSON.parse(scanText);

      if (!scanResponse.ok) {
        throw new Error(
          scanData.error || 'Unable to submit URL',
        );
      }

      if (!scanData.analysisId) {
        throw new Error('Analysis ID not received');
      }

      let analysisResults: ScanResults | null = null;

      // Wait for VirusTotal analysis
      for (let attempt = 0; attempt < 10; attempt++) {
        await wait(3000);

        const resultResponse = await fetch(
          `http://10.0.2.2:5000/analysis/${encodeURIComponent(
            scanData.analysisId,
          )}`,
        );

        const resultText = await resultResponse.text();
        const resultData = JSON.parse(resultText);

        if (!resultResponse.ok) {
          throw new Error(
            resultData.error || 'Unable to get scan results',
          );
        }

        if (resultData.status === 'completed') {
          analysisResults = resultData as ScanResults;
          break;
        }
      }

      if (!analysisResults) {
        Alert.alert(
          'Analysis Pending',
          'VirusTotal is still analysing this URL. Please try again shortly.',
        );
        return;
      }

      // Save scan history to Firestore
      try {
        await saveScanHistory(validUrl, analysisResults);
      } catch (error) {
        console.log('Firestore error:', error);

        Alert.alert(
          'History Warning',
          'Scan completed, but history could not be saved.',
        );
      }

      // Navigate to Scan Results page
      onScanComplete(validUrl, analysisResults);

    } catch (error: any) {
      console.log('Scanning error:', error);

      Alert.alert(
        'Scanning Error',
        error.message || 'Unable to scan URL',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backButton}>
          ← Back to Dashboard
        </Text>
      </TouchableOpacity>

      <Text style={styles.logo}>🛡️</Text>

      <Text style={styles.title}>URL Scanner</Text>

      <Text style={styles.subtitle}>
        Check website links for potential security threats.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        placeholderTextColor="#888"
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        value={url}
        onChangeText={setUrl}
        editable={!loading}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleScan}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Scan URL</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>
        Stay alert. Avoid clicking suspicious links.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    padding: 25,
  },
  backButton: {
    color: '#60A5FA',
    fontSize: 16,
    marginBottom: 25,
  },
  logo: {
    fontSize: 65,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  note: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
  },
});