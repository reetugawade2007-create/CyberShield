import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
export default function LoginScreen({onLoginSuccess}: {onLoginSuccess: () => void}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  if (!email.trim() || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }

  try {
    setLoading(true);

    await signInWithEmailAndPassword(
      getAuth(),
      email.trim(),
      password,
    );

    Alert.alert('Success', 'Login Successful!');
    onLoginSuccess();

  } catch (error: any) {
    Alert.alert('Login Failed', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>🛡️</Text>

      <Text style={styles.title}>CyberShield</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footer}>
        Secure your digital world with CyberShield
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    fontSize: 65,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 35,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
  },
});