import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/theme';
import Slider from '@react-native-community/slider';

type Props = {
  spiciness: number;
  onChange: (value: number) => void;
};

const labels = ['😐', '🙂', '😏', '😉', '🔥'];
const levels = ['Chill', 'Normal', 'Playful', 'Flirty', 'Fire'];

export default function SpicinessSlider({ spiciness, onChange }: Props) {
  return (
    <View>
      <Text style={styles.label}>
        Spiciness: {labels[spiciness]} {levels[spiciness]}
      </Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={4}
        step={1}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor="#ccc"
        thumbTintColor={colors.accent}
        value={spiciness}
        onValueChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
});
