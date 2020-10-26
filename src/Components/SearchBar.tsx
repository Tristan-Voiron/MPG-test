import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Props {
  onChange: (arg0: string) => void;
}
interface State {}

export default class SearchBar extends Component<Props, State> {
  render() {
    return (
      <View
        style={styles.container}>
        <Ionicons
          style={styles.iconStyle}
          name="ios-search"
          color={'gray'}
          size={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom du joueur"
          returnKeyType="search"
          onChangeText={(text) => this.props.onChange(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 0.2,
  },
  input: {
    flex: 1,
  },
  iconStyle: {
    marginHorizontal: 10,
  },
});
