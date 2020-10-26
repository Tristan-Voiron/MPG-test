import { Image, StyleSheet } from 'react-native';

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
        <Stack.Screen 
          name="PlayerList" 
          component={PlayerList} 
          options={{ 
            headerTitle: () => (
             <Image
               style={{ width: 100, height: 50 }}
               source={require('./src/assets/mpglogo.png')}
               resizeMode='contain'
             />
           ),
           headerTitleStyle: { flex: 1, textAlign: 'center' },
           }}
        />
        <Stack.Screen 
          name="PlayerDetails" 
          component={PlayerDetails} 
          options={({ route }) => ({ 
            //title: route.params.firstname, 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}