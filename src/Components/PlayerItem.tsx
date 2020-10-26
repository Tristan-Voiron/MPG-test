import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {getPosition} from '../function/utils';

interface Props {
  firstname: string,
  lastname: string,
  ultraPosition: number,
  club: string,
  id: string,
  avgRate: number,
  onPress: (arg0: string, arg1: string, arg2: string) => void;
}
interface State {}

export default class PlayerItem extends Component<Props, State> {
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => this.props.onPress(this.props.id, this.props.firstname, this.props.lastname)}>
          <View style={[styles.rowContainer, styles.itemContainer]}>
            <View style={styles.columnContainer}>
              {
                this.props.firstname ? 
                <Text style={styles.name}>{this.props.firstname} {this.props.lastname}</Text> 
                :
                <Text style={styles.name}>{this.props.lastname}</Text>
              }
              <Text>{this.props.club} - {getPosition(this.props.ultraPosition)}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.rating}>{this.props.avgRate}</Text>
              <Ionicons style={styles.icon} name="ios-star-half" size={22} color="green" />
            </View>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    marginLeft: 5,
  }
});

