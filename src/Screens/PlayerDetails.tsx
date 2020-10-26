import { Clipboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {Component} from 'react';

import ErrorIndicator from '../Components/ErrorIndicator';
import { Ionicons } from '@expo/vector-icons';
import LoadingIndicator from '../Components/LoadingIndicator';
import {getPosition} from '../function/utils';
import { showMessage } from "react-native-flash-message";

interface Props {
  route: any,
}
interface State { 
  loading: boolean,
  error: boolean,
  data: Array<any>,
}

export default class PlayerDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      data: new Array(),
    };
  }

  componentDidMount() {
    this.getPlayerDetail();
  }

  getPlayerDetail() {
    let idPlayer: string = this.props.route.params.id.split('_')[1];
    const url = `https://api.monpetitgazon.com/stats/player/` + idPlayer + `?season=2018`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingIndicator/>
      )
    }

    if (this.state.error) {
      return (
        <ErrorIndicator onPress={() => this.getPlayerDetail()}/>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.playerInfo}>
            <View style={styles.columnContainer}>
              <Text style={styles.playerInfoText}>N° {this.state.data.jerseyNum}</Text>
              <Text style={styles.playerInfoText}>{this.state.data.club} - {getPosition(this.state.data.ultraPosition)}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => 
              (
                Clipboard.setString(this.state.data.twitter),
                showMessage({
                  message: "Copié dans le presse-papier",
                })
              )}
            >
              <Ionicons
                name="logo-twitter"
                color={'#00acee'}
                size={30}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.playerScore}>
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Note Moy.</Text>
                <Text style={styles.detail}>{this.state.data.stats.avgRate}</Text>
              </View>
              {
                this.state.data.ultraPosition === 10 ? 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Clean Sheet</Text>
                    <Text style={styles.detail}>{this.state.data.stats.sumCleanSheet}</Text>
                  </View>
                )
                : 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Buts (pén)</Text>
                <Text style={styles.detail}>{this.state.data.stats.sumGoals} ({this.state.data.stats.sumPenalties})</Text>
                  </View>
                )
              }
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Titulaire (remp.)</Text>
                <Text style={styles.detail}>{this.state.data.stats.appearances.starter} ({this.state.data.stats.appearances.standIn})</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Cote</Text>
                <Text style={styles.detail}>{this.state.data.quotation}</Text>
              </View>
              {
                this.state.data.ultraPosition === 10 ? 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>% Sauvés</Text>
                    <Text style={styles.detail}>{this.state.data.stats.percentageSaveShot}</Text>
                  </View>
                )
                : 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Passes dé.</Text>
                    <Text style={styles.detail}>{this.state.data.stats.sumGoalAssist}</Text>
                  </View>
                )
              }
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Cartons</Text>
                <View style={styles.rowContainer}>
                  <Text style={[styles.detail, {backgroundColor: 'red'}]}>{this.state.data.stats.sumRedCard}</Text>
                  <Text style={[styles.detail, {backgroundColor: 'yellow'}]}>{this.state.data.stats.sumYellowCard}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <ScrollView>

          </ScrollView>
        </View>
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  columnContainer: {
    flexDirection: 'column',
  },
  playerInfo: {
    borderWidth: 0.2,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  playerInfoText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconStyle: {
    marginHorizontal: 10,
  },

  playerScore: {
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  detail: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});