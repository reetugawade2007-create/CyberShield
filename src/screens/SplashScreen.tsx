import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
      />

      {/* Shield Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🛡️</Text>
        <Text style={styles.lock}>🔒</Text>
      </View>

      {/* App Name */}
      <Text style={styles.title}>CyberShield</Text>

      {/* Tagline */}
      <Text style={styles.subtitle}>
        Your Digital World, Protected.
      </Text>

      {/* Loading Indicator */}
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2196F3"
        />
        <Text style={styles.loadingText}>
          Securing your experience...
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        CYBERSECURITY • PRIVACY • PROTECTION
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#071426',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width: 145,
    height: 145,
    borderRadius: 75,
    backgroundColor: '#102C4A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    marginBottom: 25,
    elevation: 15,
  },

  logo: {
    fontSize: 75,
  },

  lock: {
    position: 'absolute',
    bottom: 15,
    right: 13,
    fontSize: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 15,
    color: '#90CAF9',
    marginTop: 10,
  },

  loading: {
    marginTop: 65,
    alignItems: 'center',
  },

  loadingText: {
    color: '#B0BEC5',
    marginTop: 12,
    fontSize: 13,
  },

  footer: {
    position: 'absolute',
    bottom: 35,
    color: '#607D8B',
    fontSize: 10,
    letterSpacing: 1.5,
  },

});