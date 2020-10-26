import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  firstname: string,
  lastname: string,
  ultraPosition: number,
  club: string,
  id: string,
  avgRate: number,
}
interface State {}

export default class PlayerItem extends Component<Props, State> {

  getPosition () {
    let position: String = '';
    switch(this.props.ultraPosition) {
      case 10: {
        position = 'Gardien';
        break;
      }
      case 20: {
        position = 'Défenseur';
        break;
      }
      case 21: {
        position = 'Latéral';
        break;
      }
      case 31: {
        position = 'Milieu défensif';
        break;
      }
      case 32: {
        position = 'Milieu offensif';
        break;
      }
      case 40: {
        position = 'Attaquant';
        break;
      }
    }
    return position;
  }
  
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.name}>{this.props.firstname} {this.props.lastname}</Text>
              <Text>{this.props.club} - {this.getPosition()}</Text>
            </View>
            <Text style={styles.rating}>{this.props.avgRate}</Text>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
});

