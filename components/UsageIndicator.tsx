import React, { useState, useCallback } from 'react';
import { Text } from 'react-native';
import { getUsage } from '../lib/usage';
import { homeStyles } from '../styles/homeStyles';
import { useFocusEffect } from '@react-navigation/native';

export default function UsageIndicator() {
  const [count, setCount] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUsage = async () => {
        const usage = await getUsage();
        if (isActive) {
          setCount(usage);
        }
      };

      fetchUsage();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <Text style={homeStyles.usageText}>
      🔄 {count} / 15 replies used today.
    </Text>
  );
}
