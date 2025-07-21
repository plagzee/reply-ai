// screens/DeveloperScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeStyles } from '../styles/homeStyles';

export default function DeveloperScreen() {
  const [resetting, setResetting] = useState(false);

  const resetUsage = async () => {
    setResetting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.removeItem(`usage-${today}`);
      Alert.alert('Success', 'Usage has been reset for today ✅');
    } catch (error) {
      console.error('Failed to reset usage:', error);
      Alert.alert('Error', 'Failed to reset usage.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>🛠️ Developer Options</Text>

      <TouchableOpacity
        style={[homeStyles.button, { backgroundColor: '#d9534f' }]}
        onPress={resetUsage}
        disabled={resetting}
      >
        <Text style={homeStyles.buttonText}>
          {resetting ? 'Resetting...' : '🔄 Reset Daily Usage'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
