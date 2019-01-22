import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

import AppContext from '../context/AppContext';

export default class AddNewCustomer extends React.Component {
  state = {}

  _handleInputChange = (text, inputName) => {
    this.setState({
      [inputName]:text
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Provider>
            <View>

            </View>
          </Provider>
        )}
      </AppContext.Consumer>
    );
  }
}