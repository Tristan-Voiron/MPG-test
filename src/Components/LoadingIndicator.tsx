import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import React, {Component} from 'react';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
          <ActivityIndicator size='large' color="#00ff00" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

