import AsyncStorage from '@react-native-async-storage/async-storage';

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `usage-${today}`;
};

export const incrementUsage = async () => {
  const key = getTodayKey();
  const current = parseInt((await AsyncStorage.getItem(key)) || '0');
  await AsyncStorage.setItem(key, (current + 1).toString());
};

export const getUsage = async () => {
  const key = getTodayKey();
  return parseInt((await AsyncStorage.getItem(key)) || '0');
};

export const resetUsage = async() => {
  const today = new Date().toISOString().split('T')[0];
  await AsyncStorage.removeItem(`usage-${today}`);
  console.log('Usage reset');
}
