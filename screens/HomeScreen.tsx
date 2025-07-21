import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { homeStyles } from '../styles/homeStyles';
import SpicinessSlider from '../components/SpicinessSlider';
import UsageIndicator from '../components/UsageIndicator';
import { useNavigation } from '@react-navigation/native';
import ScreenshotScreen from './ScreenshotScreen';

export default function HomeScreen() {
  const [spiciness, setSpiciness] = useState(2); // 0 = chill, 4 = fire

  const navigation = useNavigation();

  const handleScanScreenshot = () => {
    navigation.navigate('Screenshot' as never);
  };

  const handleEnterText = () => {
    navigation.navigate('TextInput' as never);
  };

  const handleGenerate = () => {
    Alert.alert('Reply Generated', `Spiciness Level: ${spiciness}`);
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>ReplyAI 🌸</Text>
      <Text style={homeStyles.tagline}>
        Craft the perfect reply, every time.
      </Text>

      <TouchableOpacity style={homeStyles.button} onPress={handleScanScreenshot}>
        <Text style={homeStyles.buttonText}>📸  Scan Screenshot</Text>
      </TouchableOpacity>

      <TouchableOpacity style={homeStyles.button} onPress={handleEnterText}>
        <Text style={homeStyles.buttonText}>⌨️  Enter Text Manually</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={homeStyles.button} onPress={handleGenerate}>
        <Text style={homeStyles.buttonText}>💬 Generate Reply</Text>
      </TouchableOpacity> */}
      {/* {__DEV__ && (
        <TouchableOpacity onPress={() => navigation.navigate('Developer' as never)}>
          <Text style={{ color: '#888', marginTop: 16 }}>🛠️ Dev Tools</Text>
        </TouchableOpacity>
      )} */}

      <UsageIndicator />
    </View>
  );
}
