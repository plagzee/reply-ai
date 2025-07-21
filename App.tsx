import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TextInputScreen from './screens/TextInputScreen';
import ScreenshotScreen from './screens/ScreenshotScreen';
import DeveloperScreen from './screens/DeveloperScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // hide header for cozy UI
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TextInput" component={TextInputScreen} />
        <Stack.Screen name="Screenshot" component={ScreenshotScreen} />
        <Stack.Screen name="Developer" component={DeveloperScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
