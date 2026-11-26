import React, {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function SettingsScreen({
  onBack,
  onLogout,
}: Props) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const showPrivacy = () => {
    Alert.alert(
      'Privacy & Security',
      'CyberShield helps you protect your online activities. Keep your account secure and never share your password.',
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About CyberShield',
      'CyberShield is a cybersecurity application designed to help users identify suspicious URLs and understand online threats.\n\nVersion 1.0.0\n© 2026 CyberShield',
    );
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: onLogout,
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Settings ⚙️</Text>

      <Text style={styles.subtitle}>
        Manage your CyberShield preferences.
      </Text>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>
        Preferences
      </Text>

      <View style={styles.card}>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingIcon}>🔔</Text>
            <View>
              <Text style={styles.settingTitle}>
                Notifications
              </Text>
              <Text style={styles.settingDescription}>
                Receive security notifications
              </Text>
            </View>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: '#475569',
              true: '#2563EB',
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingIcon}>🌙</Text>
            <View>
              <Text style={styles.settingTitle}>
                Dark Mode
              </Text>
              <Text style={styles.settingDescription}>
                Enable dark appearance
              </Text>
            </View>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{
              false: '#475569',
              true: '#2563EB',
            }}
            thumbColor="#FFFFFF"
          />
        </View>

      </View>

      {/* Security */}
      <Text style={styles.sectionTitle}>
        Security & Privacy
      </Text>

      <View style={styles.card}>

        <TouchableOpacity
          style={styles.menuRow}
          onPress={showPrivacy}>
          <Text style={styles.settingIcon}>🔐</Text>

          <View style={styles.menuText}>
            <Text style={styles.settingTitle}>
              Privacy & Security
            </Text>
            <Text style={styles.settingDescription}>
              Learn about account protection
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

      </View>

      {/* Application */}
      <Text style={styles.sectionTitle}>
        Application
      </Text>

      <View style={styles.card}>

        <TouchableOpacity
          style={styles.menuRow}
          onPress={showAbout}>
          <Text style={styles.settingIcon}>ℹ️</Text>

          <View style={styles.menuText}>
            <Text style={styles.settingTitle}>
              About CyberShield
            </Text>
            <Text style={styles.settingDescription}>
              App information and version
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={confirmLogout}>
        <Text style={styles.logoutText}>
          ↪  Logout
        </Text>
      </TouchableOpacity>

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
    marginTop: 8,
    marginBottom: 25,
  },

  sectionTitle: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 18,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingIcon: {
    fontSize: 23,
    marginRight: 14,
  },

  settingTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  settingDescription: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  menuText: {
    flex: 1,
  },

  arrow: {
    color: '#94A3B8',
    fontSize: 26,
  },

  logoutButton: {
    backgroundColor: '#7F1D1D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#FCA5A5',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    fontSize: 11,
  },
});
