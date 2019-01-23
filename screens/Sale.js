import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Appbar, DefaultTheme, List, Subheading, TextInput, TouchableRipple } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Sale extends React.Component {

  state = {
    name: '',
    phone: '',
    address: ''
  }

  _handleInputChange = (value, inputName) => {
    this.setState({
      [inputName]:value
    });
  }

  _submitData = (addCustomer, showAlert) => {
    if(addCustomer(this.state.name, this.state.phone, this.state.address)) {
      showAlert('Agregado correctamente');
      this.props._setView(0, null)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <AppContext>
          {context => (
            <View style={styles.baseContainer}>
              <Appbar.Header theme={Theme}>
                <Appbar.BackAction
                  onPress={() => this.props._setView(0, null)}
                />
                <Appbar.Content
                  title="Agregar nuevo cliente"
                />
              </Appbar.Header>
              <View style={styles.body}>
                <ScrollView style={styles.body}>
                  {context.state.beers.map(beer => {
                    return (
                      <TouchableRipple key={beer.id} onPress={() => console.log(beer.name)}>
                        <List.Item title={beer.name} />
                      </TouchableRipple>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}
        </AppContext>
      </KeyboardAvoidingView>
    );
  }
}

const textInputStyle = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#fff'
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
    justifyContent: 'space-evenly'
  },
  staticContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: Theme.roundness
  }
});