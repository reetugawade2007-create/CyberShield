import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {PaperProvider, Button} from 'react-native-paper';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import URLScannerScreen from './src/screens/URLScannerScreen';
import ScanResultsScreen from './src/screens/ScanResultsScreen';
import ScanHistoryScreen from './src/screens/ScanHistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ThreatsScreen from './src/screens/ThreatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SecurityTipsScreen from './src/SecurityTipsScreen';

interface ScanResults {
  status: string;
  stats: {
    malicious: number;
    suspicious: number;
    harmless: number;
    undetected: number;
  };
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('login');
  const [scannedUrl, setScannedUrl] = useState('');
  const [scanResults, setScanResults] =
    useState<ScanResults | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  // REGISTER
  if (screen === 'register') {
    return (
      <RegisterScreen
        onBack={() => setScreen('login')}
        onLogout={() => setScreen('login')}
      />
    );
  }

  // LOGIN
  if (screen === 'login') {
    return (
      <>
        <LoginScreen
          onLoginSuccess={() => setScreen('home')}
        />

        <Button
          mode="text"
          textColor="#60A5FA"
          onPress={() => setScreen('register')}>
          Don't have an account? Register
        </Button>
      </>
    );
  }

  // SCREEN NAVIGATION
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            onOpenScanner={() => setScreen('scanner')}
            onOpenHistory={() => setScreen('history')}
            onOpenTips={() => setScreen('tips')}
            onOpenProfile={() => setScreen('profile')}
          />
        );

      case 'scanner':
        return (
          <URLScannerScreen
            onBack={() => setScreen('home')}
            onScanComplete={(url, results) => {
              setScannedUrl(url);
              setScanResults(results);
              setScreen('results');
            }}
          />
        );

      case 'history':
        return (
          <ScanHistoryScreen
            onBack={() => setScreen('home')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setScreen('home')}
            onLogout={() => setScreen('login')}
          />
        );

      case 'threats':
        return (
          <ThreatsScreen
            onBack={() => setScreen('home')}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setScreen('home')}
            onLogout={() => setScreen('login')}
          />
        );

      case 'tips':
        return (
          <SecurityTipsScreen
            onBack={() => setScreen('home')}
          />
        );

      case 'results':
        return scanResults ? (
          <ScanResultsScreen
            url={scannedUrl}
            results={scanResults}
            onBack={() => setScreen('scanner')}
          />
        ) : null;

      default:
        return null;
    }
  };

  // ACTIVE TAB
  const activeTab =
    screen === 'scanner' || screen === 'results'
      ? 'scanner'
      : screen === 'history'
      ? 'history'
      : screen === 'threats'
      ? 'threats'
      : screen === 'profile'
      ? 'profile'
      : screen === 'settings'
      ? 'settings'
      : 'home';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('home')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'home' && styles.activeTab,
          ]}>🏠</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'home' && styles.activeTab,
          ]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('scanner')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'scanner' && styles.activeTab,
          ]}>🔍</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'scanner' && styles.activeTab,
          ]}>Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('history')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'history' && styles.activeTab,
          ]}>📋</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'history' && styles.activeTab,
          ]}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('threats')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'threats' && styles.activeTab,
          ]}>⚠️</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'threats' && styles.activeTab,
          ]}>Threats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('profile')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'profile' && styles.activeTab,
          ]}>👤</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'profile' && styles.activeTab,
          ]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setScreen('settings')}>
          <Text style={[
            styles.tabIcon,
            activeTab === 'settings' && styles.activeTab,
          ]}>⚙️</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'settings' && styles.activeTab,
          ]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// MAIN APP WITH REACT NATIVE PAPER
export default function App() {
  return (
    <PaperProvider>
      <AppContent />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0B1120',
  },

  screenContainer: {
    flex: 1,
  },

  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 9,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },

  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
    color: '#94A3B8',
  },

  tabText: {
    color: '#94A3B8',
    fontSize: 9,
    textAlign: 'center',
  },

  activeTab: {
    color: '#60A5FA',
    fontWeight: 'bold',
  },
});