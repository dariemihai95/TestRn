/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fetchData } from '../../services/fetch';
import { urls, cardKeys, messages, buttonText, generalText } from '../../utils/constants';
import { Card, Icon } from 'react-native-elements';

export default class Home extends React.Component {

  state = {
    dataList: [],
    isLoading: false,
    isAscending: true,
    isOrderingTriggered: false,
  }

  setData = async () => {
    this.setState({ isLoading: true, isAscending: true, isOrderingTriggered: false })
    const payload = await fetchData(urls);
    this.setState({ dataList: payload, isLoading: false });
  }

  clearData = () => {
    this.setState({ dataList: [], isLoading: false, isAscending: true, isOrderingTriggered: false });
  }

  sortList = (isAscOrder) => {
    const { state: { dataList, isAscending } } = this;
    let data = dataList
    if (isAscOrder) {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }
    this.setState({ dataList: data })
  }

  sortByTitle = () => {
    const { sortList, state: { isOrderingTriggered, isAscending, dataList } } = this;
    let isAscOrder = isAscending;
    if (dataList.length > 1) {
      if (isOrderingTriggered) {
        this.setState({ isAscending: !isAscending });
        isAscOrder = !isAscOrder
      } else {
        this.setState({ isOrderingTriggered: true });
      }
      sortList(isAscOrder);
    }
  }

  navigateToDetails = (item) => {
    const { props: { navigation } } = this;
    navigation.navigate('Details', item)
  }

  render() {

    const {
      setData, clearData, sortByTitle, navigateToDetails,
      state: { dataList, isLoading, isAscending }
    } = this;

    return (
      <View style={{ backgroundColor: Colors.lighter }}>
        <TouchableOpacity
          style={{ minHeight: 20, height: '3%', margin: 10, display: 'flex', flexDirection: 'row' }}
          onPress={sortByTitle}
        >
          <Icon name={isAscending ? 'arrow-down' : 'arrow-up' } type='feather' color='#000000' />
          <Text>{generalText.title}</Text>
        </TouchableOpacity>
        <View style={{ height: '95%' }}>
          {isLoading
            ? <View style={styles.loadingContainer}><Text>{messages.loading}</Text></View>
            : (
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
              >
                {dataList.map((dataItem, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => navigateToDetails(dataItem)}>
                      <Card containerStyle={{ padding: 5, borderRadius: 5 }} >
                        <Text style={styles.cardText}>{cardKeys.title}{dataItem.title}</Text>
                        <Text style={styles.cardText}>{cardKeys.artist}{dataItem.artist}</Text>
                        <Text style={styles.cardText}>{cardKeys.label}{dataItem.label}</Text>
                        <Text style={styles.cardText}>{cardKeys.year}{dataItem.year}</Text>
                      </Card>
                    </TouchableOpacity>
                  )
                })}
                <View style={{ marginBottom: 70 }} />
              </ScrollView>)
          }
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsBar}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#95e1d3' }} onPress={setData}><Text>{buttonText.get}</Text></TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#f38181' }} onPress={clearData}><Text>{buttonText.clear}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 20,
    height: '100%'
  },
  button: {
    margin: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardText: {
    marginLeft: 5
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginBottom: 20
  },
  buttonsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 20
  },
  buttonsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
