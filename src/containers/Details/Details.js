/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { cardKeys } from '../../utils/constants';

export default class Home extends React.Component {

  render() {
    const { props: { route: { params: { artist, label, title, year } } } } = this;

    return (
      <View style={styles.container}>
        <Text style={styles.cardText}>{cardKeys.title}</Text>
        <Text style={styles.parameterText}>{title}</Text>
        <Text style={styles.cardText}>{cardKeys.artist}</Text>
        <Text style={styles.parameterText}>{artist}</Text>
        <Text style={styles.cardText}>{cardKeys.label}</Text>
        <Text style={styles.parameterText}>{label}</Text>
        <Text style={styles.cardText}>{cardKeys.year}</Text>
        <Text style={styles.parameterText}>{year}</Text>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    margin: 20
  },
  cardText: {
    color: '#b0b0b0',
    fontSize: 17
  },
  parameterText: {
    marginBottom: 20,
    fontSize: 20
  }
});
