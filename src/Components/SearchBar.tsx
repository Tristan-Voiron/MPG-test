import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';

interface Props {
  onChange: (arg0: string, arg1: number) => void;
}
interface State {
  position: number,
  text: string,
}

export default class SearchBar extends Component<Props, State> {
  state = {
    position: 0,
    text: '',
  };

  resetFilter() {
    this.setState({position: 0, text: ''})
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Ionicons
          style={styles.iconStyle}
          name="ios-search"
          color={'#999'}
          size={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom du joueur"
          returnKeyType="search"
          onChangeText={(text) => (this.props.onChange(text, this.state.position), this.setState({text: text}))}
          value={this.state.text}
        />
        <View style = {styles.separator} />
        <Picker
          selectedValue={this.state.position}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            (this.props.onChange(this.state.text, Number(itemValue)), this.setState({position: Number(itemValue)}))
          }>
          <Picker.Item color="#999" label="Poste" value={0} />
          <Picker.Item color="#000" label="Gardien" value={10} />
          <Picker.Item label="Défenseur" value={20} />
          <Picker.Item label="Latéral" value={21} />
          <Picker.Item label="Milieu défensif" value={31} />
          <Picker.Item label="Milieu offensif" value={32} />
          <Picker.Item label="Attaquant" value={40} />
        </Picker>
        <View style = {styles.separator} />
        <TouchableOpacity onPress={() => (this.props.onChange('', 0), this.resetFilter())}>
          <Ionicons
            style={styles.iconStyle}
            name="ios-close-circle-outline"
            color={this.state.text === '' && this.state.position === 0 ? '#999' : 'green' }
            size={20}
          />
        </TouchableOpacity>
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
  picker: {
    width: 140, 
    transform: [
      { scaleX: 0.9 }, 
      { scaleY: 0.9 },
    ]
  },
  separator: {
      height: 40,
      width: 0.5,
      backgroundColor: '#999',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
});
