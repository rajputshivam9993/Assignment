import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../Screens/Homescreen';
import ProfileScreen from '../Screens/ProfileScreen';
const Stack = createStackNavigator();
function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
}

export default MyStack;