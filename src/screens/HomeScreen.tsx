import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Props {
  onOpenScanner: () => void;
  onOpenHistory: () => void;
  onOpenTips: () => void;
  onOpenProfile: () => void;
}

export default function HomeScreen({
  onOpenScanner,
  onOpenHistory,
  onOpenTips,
  onOpenProfile,
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>🛡️ CyberShield</Text>
          <Text style={styles.tagline}>
            Your Digital Protection
          </Text>
        </View>

        <View style={styles.notification}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </View>
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>
        Welcome Back!
      </Text>

      <Text style={styles.subtitle}>
        Stay alert. Stay protected.
      </Text>

      {/* Security Overview */}
      <View style={styles.securityCard}>
        <Text style={styles.cardSmallTitle}>
          SECURITY OVERVIEW
        </Text>

        <View style={styles.securityRow}>
          <View>
            <Text style={styles.securityTitle}>
              Your Safety Matters
            </Text>

            <Text style={styles.securityDescription}>
              Scan suspicious URLs before visiting them.
            </Text>
          </View>

          <Text style={styles.shield}>🛡️</Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusDot}>●</Text>
          <Text style={styles.statusText}>
            CyberShield is ready
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.grid}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onOpenScanner}>
          <Text style={styles.actionIcon}>🔍</Text>
          <Text style={styles.actionTitle}>
            URL Scanner
          </Text>
          <Text style={styles.actionDescription}>
            Check website safety
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onOpenHistory}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionTitle}>
            Scan History
          </Text>
          <Text style={styles.actionDescription}>
            Previous scans
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onOpenTips}>
          <Text style={styles.actionIcon}>💡</Text>
          <Text style={styles.actionTitle}>
            Security Tips
          </Text>
          <Text style={styles.actionDescription}>
            Learn online safety
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={onOpenProfile}>
          <Text style={styles.actionIcon}>👤</Text>
          <Text style={styles.actionTitle}>
            My Profile
          </Text>
          <Text style={styles.actionDescription}>
            Account information
          </Text>
        </TouchableOpacity>

      </View>

      {/* Security Reminder */}
      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>
          🔐 Security Reminder
        </Text>

        <Text style={styles.reminderText}>
          Never click unknown links or share your
          passwords with untrusted websites.
        </Text>
      </View>

      {/* Footer */}
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
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    color: '#60A5FA',
    fontSize: 24,
    fontWeight: 'bold',
  },

  tagline: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },

  notification: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
  },

  notificationIcon: {
    fontSize: 20,
  },

  welcome: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 35,
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 22,
  },

  securityCard: {
    backgroundColor: '#17345A',
    padding: 20,
    borderRadius: 18,
    marginBottom: 28,
  },

  cardSmallTitle: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 15,
  },

  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  securityTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    maxWidth: 210,
  },

  securityDescription: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 8,
    maxWidth: 210,
    lineHeight: 19,
  },

  shield: {
    fontSize: 43,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  statusDot: {
    color: '#4ADE80',
    fontSize: 13,
  },

  statusText: {
    color: '#4ADE80',
    fontSize: 12,
    marginLeft: 7,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  actionCard: {
    backgroundColor: '#1E293B',
    width: '48%',
    padding: 17,
    borderRadius: 16,
    marginBottom: 14,
    minHeight: 145,
    borderWidth: 1,
    borderColor: '#334155',
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 12,
  },

  actionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  actionDescription: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 7,
  },

  reminderCard: {
    backgroundColor: '#172235',
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#60A5FA',
  },

  reminderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  reminderText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25,
    fontSize: 11,
  },
});