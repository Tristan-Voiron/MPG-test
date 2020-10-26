import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import React, {Component} from 'react';

import ErrorIndicator from '../Components/ErrorIndicator';
import LoadingIndicator from '../Components/LoadingIndicator';
import PlayerItem from '../Components/PlayerItem';
import { StatusBar } from 'expo-status-bar';

interface Props{}
interface State { 
  loading: boolean,
  error: boolean,
  data: Array< {
    club: string,
    id: string, 
    firstname: string,
    lastname: string,
    position: number,
    quotation: number,
    stats: {
      avgRate: number,
      currentChampionship: number,
      percentageStarter: number,
      sumGoals: number,
    },
    teamId: number,
    ultraPosition: number,
  }>,
}

export default class PlayerList extends Component<Props, State> {
    state = {
      loading: true,
      error: false,
      data: new Array(),
    };

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    console.log('toto');
    const url = `https://api.monpetitgazon.com/stats/championship/1/2018`;
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

    if (!this.state.error) {
      return (
        <ErrorIndicator onPress={() => this.getPlayers()}/>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <PlayerItem 
              firstname={item.firstname} 
              lastname={item.lastname}
              id={item.id}
              ultraPosition={item.ultraPosition}
              avgRate={item.stats.avgRate}
              club={item.club}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});