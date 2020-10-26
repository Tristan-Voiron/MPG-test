import {NavigationContainer} from '@react-navigation/native';
import PlayerDetails from './src/Screens/PlayerDetails';
import PlayerList from './src/Screens/PlayerList';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlayerList" component={PlayerList} />
        <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}