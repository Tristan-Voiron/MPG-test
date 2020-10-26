import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import React, {Component} from 'react';

import ErrorIndicator from '../Components/ErrorIndicator';
import LoadingIndicator from '../Components/LoadingIndicator';
import PlayerItem from '../Components/PlayerItem';
import SearchBar from '../Components/SearchBar';
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
  filteredData: Array< {
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
  constructor(props: Props) {
    super(props);
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      loading: true,
      error: false,
      data: new Array(),
      filteredData: new Array(),
    };
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    const url = `https://api.monpetitgazon.com/stats/championship/1/2018`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          filteredData: res,
          data: res,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });
  }

  navigateToDetails(id: string) {
    console.log(id);
  }

  onSearch(text: string) {
    const newData = this.state.data.filter((item) => {
      var itemData: string;
      if (item.firstname) {
        itemData = item.firstname.toUpperCase() + ' ' + item.lastname.toUpperCase();
      }
      else {
        itemData = item.lastname.toUpperCase();
      }
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({filteredData: newData});
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingIndicator/>
      )
    }

    if (this.state.error) {
      return (
        <ErrorIndicator onPress={() => this.getPlayers()}/>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <SearchBar onChange={(text) => this.onSearch(text)}/>
        <FlatList
          data={this.state.filteredData}
          renderItem={({ item }) => (
            <PlayerItem 
              firstname={item.firstname} 
              lastname={item.lastname}
              id={item.id}
              ultraPosition={item.ultraPosition}
              avgRate={item.stats.avgRate}
              club={item.club}
              onPress={(id) => this.navigateToDetails(id)}
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