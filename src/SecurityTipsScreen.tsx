import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  onBack: () => void;
}

const tips = [
  {
    icon: '🔗',
    title: 'Avoid Suspicious Links',
    description:
      'Never click unknown links received through emails, messages or social media.',
  },
  {
    icon: '🔐',
    title: 'Use Strong Passwords',
    description:
      'Create passwords using uppercase, lowercase, numbers and special characters.',
  },
  {
    icon: '🛡️',
    title: 'Enable Two-Factor Authentication',
    description:
      'Add an extra layer of security to your online accounts.',
  },
  {
    icon: '📥',
    title: 'Avoid Unknown Downloads',
    description:
      'Download applications and files only from trusted sources.',
  },
  {
    icon: '🌐',
    title: 'Check Website Security',
    description:
      'Check the website address carefully and look for HTTPS before entering sensitive information.',
  },
  {
    icon: '🔄',
    title: 'Update Your Software',
    description:
      'Keep your operating system and applications updated to fix security vulnerabilities.',
  },
];

export default function SecurityTipsScreen({onBack}: Props) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Security Tips 💡</Text>

      <Text style={styles.subtitle}>
        Stay alert. Stay safe. Protect your digital world.
      </Text>

      {tips.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.icon}>{tip.icon}</Text>

          <Text style={styles.title}>{tip.title}</Text>

          <Text style={styles.description}>
            {tip.description}
          </Text>
        </View>
      ))}

      <Text style={styles.footer}>
        CyberShield © 2026
      </Text>
    </ScrollView>
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
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});