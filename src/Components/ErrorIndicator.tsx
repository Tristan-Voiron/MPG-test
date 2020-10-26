import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
}
interface State {}

export default class ErrorIndicator extends Component<Props, State> {
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
         <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={this.props.onPress}>
            <Text style={styles.text}>L'accès aux données a échoué, veuillez cliquer ici pour recommencer.</Text>
            <Ionicons name="ios-refresh" size={32} color="green" />
        </TouchableOpacity>
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
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  }
});

