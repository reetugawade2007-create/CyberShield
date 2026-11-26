import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function RegisterScreen({
  onBack,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Error',
        'Password must contain at least 6 characters.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Error',
        'Passwords do not match.',
      );
      return;
    }

    try {
      setLoading(true);

      const auth = getAuth();

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      Alert.alert(
        'Success',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: onBack,
          },
        ],
      );

    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back to Login</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.logo}>🛡️</Text>

        <Text style={styles.title}>
          CyberShield
        </Text>

        <Text style={styles.subtitle}>
          Create Your Account
        </Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#94A3B8"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}>

          <Text style={styles.registerText}>
            {loading ? 'Creating Account...' : 'Register'}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBack}
          style={styles.loginLink}>

          <Text style={styles.loginText}>
            Already have an account? Login
          </Text>

        </TouchableOpacity>

      </View>

      <Text style={styles.footer}>
        Secure your digital world with CyberShield
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },

  content: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
  },

  back: {
    color: '#60A5FA',
    fontSize: 16,
    marginBottom: 25,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 55,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 8,
  },

  form: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 18,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 15,
  },

  registerButton: {
    backgroundColor: '#0EA5E9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginLink: {
    alignItems: 'center',
    marginTop: 22,
  },

  loginText: {
    color: '#60A5FA',
    fontSize: 14,
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

});