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

export default function ThreatsScreen({onBack}: Props) {
  const threats = [
    {
      icon: '🎣',
      title: 'Phishing Attack',
      level: 'High Risk',
      color: '#F97316',
      description:
        'Fake emails, messages or websites designed to steal passwords and personal information.',
      prevention:
        'Never open suspicious links or share OTPs.',
    },
    {
      icon: '🦠',
      title: 'Malware',
      level: 'High Risk',
      color: '#EF4444',
      description:
        'Malicious software that can damage devices, steal data or monitor activities.',
      prevention:
        'Install trusted software and keep antivirus protection updated.',
    },
    {
      icon: '🔒',
      title: 'Ransomware',
      level: 'Critical Risk',
      color: '#DC2626',
      description:
        'Malware that locks or encrypts files and demands money to restore access.',
      prevention:
        'Keep regular backups and avoid unknown attachments.',
    },
    {
      icon: '👤',
      title: 'Identity Theft',
      level: 'High Risk',
      color: '#F97316',
      description:
        'Someone uses another person\'s personal information without permission.',
      prevention:
        'Protect personal details and use strong passwords.',
    },
    {
      icon: '📡',
      title: 'Man-in-the-Middle',
      level: 'Medium Risk',
      color: '#EAB308',
      description:
        'An attacker secretly intercepts communication between two parties.',
      prevention:
        'Avoid sensitive transactions on unsecured public Wi-Fi.',
    },
    {
      icon: '💻',
      title: 'SQL Injection',
      level: 'High Risk',
      color: '#F97316',
      description:
        'An attacker inserts malicious SQL commands into vulnerable applications.',
      prevention:
        'Use parameterized queries and validate user input.',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Cyber Threats</Text>

      <Text style={styles.subtitle}>
        Understand online threats and learn how to protect yourself.
      </Text>

      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>🛡️</Text>

        <Text style={styles.bannerTitle}>
          Stay Alert, Stay Safe
        </Text>

        <Text style={styles.bannerText}>
          Knowledge is your first line of defence against cyber attacks.
        </Text>
      </View>

      {threats.map((item, index) => (
        <View style={styles.card} key={index}>
          <View style={styles.cardHeader}>
            <Text style={styles.icon}>{item.icon}</Text>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>

              <Text
                style={[
                  styles.level,
                  {color: item.color},
                ]}>
                {item.level}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>
            {item.description}
          </Text>

          <View style={styles.preventionBox}>
            <Text style={styles.preventionTitle}>
              ✓ Prevention
            </Text>

            <Text style={styles.preventionText}>
              {item.prevention}
            </Text>
          </View>
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
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
  },

  heading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 22,
  },

  banner: {
    backgroundColor: '#17345A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
  },

  bannerIcon: {
    fontSize: 35,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },

  bannerText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 30,
    marginRight: 13,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  level: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },

  description: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 15,
  },

  preventionBox: {
    backgroundColor: '#0F1B2D',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  preventionTitle: {
    color: '#4ADE80',
    fontSize: 13,
    fontWeight: 'bold',
  },

  preventionText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
});