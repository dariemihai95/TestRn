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
import { fetchData } from '../services/fetch';
import { urls } from '../utils/constants';
import { Card } from 'react-native-elements';

export default class Home extends React.Component {

  state = {
    dataList: [],
    isLoading: false,
  }

  setData = async () => {
    this.setState({ isLoading: true })
    const payload = await fetchData(urls);
    this.setState({ dataList: payload, isLoading: false });
  }

  clearData = () => {
    this.setState({ dataList: [], isLoading: false });
  }

  render() {

    const {
      setData, clearData,
      state: { dataList, isLoading }
    } = this;

    return (
      <>{isLoading
        ? <View style={styles.loadingContainer}><Text>Loading...</Text></View>
        : (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            {dataList.map((dataItem, index) => {
              return (
                <View key={index}>
                  <Card containerStyle={{ padding: 5, borderRadius: 5 }} >
                    <Text style={styles.cardText}>title: {dataItem.title}</Text>
                    <Text style={styles.cardText}>artist: {dataItem.artist}</Text>
                    <Text style={styles.cardText}>label: {dataItem.label}</Text>
                    <Text style={styles.cardText}>year: {dataItem.year}</Text>
                  </Card>
                </View>
              )
            })}
            <View style={{ marginBottom: 70 }} />
          </ScrollView>)
      }
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsBar}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#95e1d3' }} onPress={setData}><Text>Get</Text></TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#f38181' }} onPress={clearData}><Text>Clear</Text></TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
    backgroundColor: Colors.lighter,
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
