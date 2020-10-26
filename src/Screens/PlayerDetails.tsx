import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default class PlayerDetails extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>PlayerDetails</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});