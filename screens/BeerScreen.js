import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import { Appbar, FAB, List, TouchableRipple } from 'react-native-paper';

import Theme from './Theme';

export default class BeerScreen extends React.Component {
  render() {
    return (
      <View style={styles.baseContainer}>
        <Appbar.Header theme={Theme}>
          <Appbar.Content
            title={this.props.beer.name}
            style={{color: '#fff'}}
          />
        </Appbar.Header>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text>
              {this.props.sales[0].date.getMonth()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  noBorder: {
    borderWidth: 0,
  },
  body: {
    padding: 10
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: Theme.roundness,
    maxHeight: 440
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
});