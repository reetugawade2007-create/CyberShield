import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {getAuth, signOut} from '@react-native-firebase/auth';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({
  onBack,
  onLogout,
}: Props) {
  const user = getAuth().currentUser;

  const handleLogout = async () => {
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
          onPress: async () => {
            try {
              await signOut(getAuth());
              onLogout();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Profile 👤</Text>

      <View style={styles.profileCard}>
        <Text style={styles.avatar}>👤</Text>

        <Text style={styles.name}>
          {user?.displayName || 'CyberShield User'}
        </Text>

        <Text style={styles.email}>
          {user?.email || 'No email available'}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>
          {user?.displayName || 'Not available'}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.value}>
          {user?.email || 'Not available'}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Account Status</Text>
        <Text style={styles.status}>Active</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        CyberShield © 2026
      </Text>
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
    marginBottom: 25,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  profileCard: {
    backgroundColor: '#1E293B',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    fontSize: 55,
    marginBottom: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },
  email: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 15,
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 6,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
  },
  status: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
  },
});
