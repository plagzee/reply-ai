import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  Platform,
  ToastAndroid,
} from 'react-native';
import { homeStyles } from '../styles/homeStyles';
import { textInputStyles } from '../styles/textInputStyles';
import SpicinessSlider from '../components/SpicinessSlider';
import { getReply } from '../lib/openRouter';
import { incrementUsage } from '../lib/usage';
import * as ClipboardAPI from 'expo-clipboard';
import { getUsage } from '../lib/usage';
import { Alert } from 'react-native';

export default function TextInputScreen() {
  const [input, setInput] = useState('');
  const [spiciness, setSpiciness] = useState(2);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleGenerate = async () => {


    const usage = await getUsage();
    if (usage >= 15) {
      Alert.alert('Limit reached', 'You have reached the limit of 15 replies today. Please try again tomorrow.');
      return;
    }

    if (!input.trim()) return;
    setLoading(true);
    setReply('');
    fadeAnim.setValue(0);
    try {
      const result = await getReply(input.trim(), spiciness);
      setReply(result);
      await incrementUsage();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      setReply('❌ Failed to generate reply. Please try again.');
      console.error(error);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await ClipboardAPI.setStringAsync(reply);
    setCopied(true);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Reply copied to clipboard!', ToastAndroid.SHORT);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <Text style={homeStyles.title}>Manual Input ✍️</Text>

      <TextInput
        placeholder="Paste or type the message here..."
        value={input}
        onChangeText={setInput}
        multiline
        numberOfLines={4}
        style={textInputStyles.input}
      />

      <SpicinessSlider spiciness={spiciness} onChange={setSpiciness} />

      <TouchableOpacity style={homeStyles.button} onPress={handleGenerate} disabled={loading}>
        <Text style={homeStyles.buttonText}>
          {loading ? 'Generating...' : '💬 Generate Reply'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="#F4978E" />}

      {reply.length > 0 && (
        <Animated.View style={[textInputStyles.replyBox, { opacity: fadeAnim }]}>
          <Text style={textInputStyles.replyText}>{reply}</Text>
          <TouchableOpacity onPress={handleCopy}>
            <Text style={textInputStyles.copyText}>
              {copied ? '✅ Copied!' : '📋 Copy'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ScrollView>
  );
}
