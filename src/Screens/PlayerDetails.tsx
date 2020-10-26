import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import ErrorIndicator from '../Components/ErrorIndicator';
import LoadingIndicator from '../Components/LoadingIndicator';
import { StatusBar } from 'expo-status-bar';

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