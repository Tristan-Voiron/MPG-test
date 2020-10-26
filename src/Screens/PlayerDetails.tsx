import { Clipboard, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

    let {data} = this.state;
    let {stats} = data;
    let isGuardian: boolean = false;
    let errorLeadToGoal: number = 0;

    if (this.state.data.ultraPosition === 10) {
      isGuardian = true;
    } else {
      for (var i = 0; i < stats.matches.length; i++) {
        errorLeadToGoal += stats.matches[i].stats.error_lead_to_goal;
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.playerInfo}>
            <View style={styles.columnContainer}>
              <Text style={styles.playerInfoText}>N° {data.jerseyNum}</Text>
              <Text style={styles.playerInfoText}>{data.club} - {getPosition(data.ultraPosition)}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => 
              (
                Clipboard.setString(data.twitter),
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
                <Text style={styles.detail}>{stats.avgRate}</Text>
              </View>
              {
                isGuardian ? 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Clean Sheet</Text>
                    <Text style={styles.detail}>{stats.sumCleanSheet}</Text>
                  </View>
                )
                : 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Buts (pén)</Text>
                <Text style={styles.detail}>{stats.sumGoals} ({stats.sumPenalties})</Text>
                  </View>
                )
              }
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Titulaire (remp.)</Text>
                <Text style={styles.detail}>{stats.appearances.starter} ({stats.appearances.standIn})</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Cote</Text>
                <Text style={styles.detail}>{data.quotation}</Text>
              </View>
              {
                isGuardian ? 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>% Sauvés</Text>
                    <Text style={styles.detail}>{stats.percentageSaveShot}</Text>
                  </View>
                )
                : 
                (
                  <View style={styles.columnContainer}>
                    <Text style={styles.title}>Passes dé.</Text>
                    <Text style={styles.detail}>{stats.sumGoalAssist}</Text>
                  </View>
                )
              }
              <View style={styles.columnContainer}>
                <Text style={styles.title}>Cartons</Text>
                <View style={styles.rowContainer}>
                  <Text style={[styles.detail, {backgroundColor: 'red'}]}>{stats.sumRedCard}</Text>
                  <Text style={[styles.detail, {backgroundColor: 'yellow'}]}>{stats.sumYellowCard}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <ScrollView>
            <View style={styles.playerScore}>
              <Text style={styles.playerInfoText}>En Forme ?</Text>
              <FlatList 
                horizontal={true}
                data={stats.matches}
                renderItem={({ item }) =>
                  (
                    stats.lastFiveRate.hasOwnProperty(item.day) ?
                      <View style={styles.rate}>
                        <Text>J.{item.day}</Text>
                        <Text>{item.info.rate}</Text>
                      </View>
                    :
                      null
                  )
                }
                keyExtractor={item => item.id}
              />
            </View>

            {
              isGuardian ? 
              (
                <View style={styles.playerScore}>
                  <Text style={styles.playerInfoText}>Efficace ?</Text>
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>But encaissés par match</Text>
                    <Text style={styles.title}>{stats.goalsConcededByMatch}</Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>Arrêts réalisés</Text>
                    <Text style={styles.title}>{stats.sumSaves}</Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>Parades</Text>
                    <Text style={styles.title}>{stats.sumDeflect}</Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>Pénaltys sauvés</Text>
                    <Text style={styles.title}>{stats.sumPenaltySave}</Text>
                  </View>
                </View>
              )
              : 
              (
                <View>
                  <View style={styles.playerScore}>
                    <Text style={styles.playerInfoText}>Efficace ?</Text>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Dribbles réussies par match</Text>
                      <Text style={styles.title}>{stats.wonContestByMatch} ({stats.percentageWonContest}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Duels remportés par match</Text>
                      <Text style={styles.title}>{stats.wonDuelByMatch} ({stats.percentageWonDuel}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Pertes de balles par match</Text>
                      <Text style={styles.title}>{stats.lostBallByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Fautes commises par match</Text>
                      <Text style={styles.title}>{stats.foulsByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Fautes subies par match</Text>
                      <Text style={styles.title}>{stats.foulsEnduredByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Tirs cadrés par match</Text>
                      <Text style={styles.title}>{stats.shotOnTargetByMatch} ({stats.percentageShotOnTarget}%)</Text>
                    </View>
                  </View>

                  <View style={styles.playerScore}>
                    <Text style={styles.playerInfoText}>Il Plante ?</Text>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Buts (pén.)</Text>
                      <Text style={styles.title}>{stats.sumGoals} ({stats.sumPenalties})</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Fréquence de but (min.)</Text>
                      <Text style={styles.title}>{stats.minutesByGoal}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Buts par match</Text>
                      <Text style={styles.title}>{stats.goalByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Tirs par match</Text>
                      <Text style={styles.title}>{stats.shotByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Grosses occasions ratées</Text>
                      <Text style={styles.title}>{stats.sumBigChanceMissed}</Text>
                    </View>
                  </View>

                  <View style={styles.playerScore}>
                    <Text style={styles.playerInfoText}>Solide ?</Text>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Interceptions par match</Text>
                      <Text style={styles.title}>{stats.interceptByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Tacles par match</Text>
                      <Text style={styles.title}>{stats.tackleByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Buts encaissés par match</Text>
                      <Text style={styles.title}>{stats.goalsConcededByMatch}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Erreurs qui amènent un but</Text>
                      <Text style={styles.title}>{errorLeadToGoal}</Text>
                    </View>
                  </View>

                  <View style={styles.playerScore}>
                    <Text style={styles.playerInfoText}>Un As de la Passe ?</Text>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Passes décisives</Text>
                      <Text style={styles.title}>{stats.sumGoalAssist}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Grosses occasions créées</Text>
                      <Text style={styles.title}>{stats.sumBigChanceCreated}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Passes réussies par match</Text>
                      <Text style={styles.title}>{stats.succeedPassByMatch} ({stats.percentageSucceedPass}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Passes réussies dans le camp adverse par match</Text>
                      <Text style={styles.title}>{stats.succeedPassFwdZoneByMatch} ({stats.percentageAccurateFwdZone}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Passes réussies dans son camp par match</Text>
                      <Text style={styles.title}>{stats.succeedPassBackZoneByMatch} ({stats.percentageAccuratePassBackZone}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Passes longues réussies par match</Text>
                      <Text style={styles.title}>{stats.succeedLongPassByMatch} ({stats.percentageAccurateLongPass}%)</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.title}>Centres réussies par match</Text>
                      <Text style={styles.title}>{stats.succeedCrossByMatch} ({stats.percentageCrossSuccess}%)</Text>
                    </View>
                  </View>
                </View>
              )
            }

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
    flexShrink: 1,
  },
  detail: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  rate: {
    borderRadius: 30,
    backgroundColor: '#00acee',
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  }
});