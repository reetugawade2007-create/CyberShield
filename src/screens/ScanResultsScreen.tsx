import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface ScanResultsScreenProps {
  url: string;
  results: {
    status: string;
    stats: {
      malicious: number;
      suspicious: number;
      harmless: number;
      undetected: number;
    };
  };
  onBack: () => void;
}

export default function ScanResultsScreen({
  url,
  results,
  onBack,
}: ScanResultsScreenProps) {
  const stats = results.stats;

  const total =
    stats.malicious +
    stats.suspicious +
    stats.harmless +
    stats.undetected;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backButton}>← Back to Scanner</Text>
      </TouchableOpacity>

      <Text style={styles.logo}>🛡️</Text>

      <Text style={styles.title}>Scan Results</Text>

      <Text style={styles.subtitle}>
        VirusTotal Security Report
      </Text>

      <View style={styles.urlCard}>
        <Text style={styles.label}>Scanned URL</Text>
        <Text style={styles.url}>{url}</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.label}>Analysis Status</Text>
        <Text style={styles.status}>{results.status}</Text>
      </View>

      <Text style={styles.sectionTitle}>
        Security Analysis
      </Text>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>🔴 Malicious</Text>
        <Text style={styles.resultValue}>
          {stats.malicious}
        </Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>🟠 Suspicious</Text>
        <Text style={styles.resultValue}>
          {stats.suspicious}
        </Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>🟢 Harmless</Text>
        <Text style={styles.resultValue}>
          {stats.harmless}
        </Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>⚪ Undetected</Text>
        <Text style={styles.resultValue}>
          {stats.undetected}
        </Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.label}>Total Security Engines</Text>
        <Text style={styles.totalValue}>{total}</Text>
      </View>

      <Text style={styles.note}>
        Results are provided by VirusTotal. A harmless
        result does not guarantee that a website is safe.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 25,
  },
  backButton: {
    color: '#60A5FA',
    fontSize: 16,
    marginBottom: 20,
  },
  logo: {
    fontSize: 55,
    textAlign: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },
  urlCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  label: {
    color: '#94A3B8',
    fontSize: 14,
  },
  url: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 8,
  },
  statusCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
  },
  status: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCard: {
    backgroundColor: '#172554',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  note: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
});