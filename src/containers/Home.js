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

export default class Home extends React.Component {

  state = {
    dataList: []
  }

  setData = async () => {
    const payload = await fetchData(urls);
    this.setState({ dataList: payload });
  }

  clearData = () => {
    this.setState({dataList: []});
  }

  render() {
    const {
      setData, clearData,
      state: { dataList }
    } = this;
    console.log(dataList)
    return (
      <>
        <View>
          <TouchableOpacity onPress={setData}><Text>Get</Text></TouchableOpacity>
          <TouchableOpacity onPress={clearData}><Text>Clear</Text></TouchableOpacity>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {dataList.map((dataItem, index) => {
            return (
              <View key={index}>
                <Text>{dataItem.artist}</Text>
              </View>
            )
          })}
        </ScrollView>
      </>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});
