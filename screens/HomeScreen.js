import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import {Icon, Row, View} from '@shoutem/ui';
import { FAB } from 'react-native-paper';

import AppContext from '../context/AppContext';

//import AddNewCustomer from './AddNewCustomer';

export default class HomeScreen extends React.Component {
  state = {
    visible: false
  }
  static navigationOptions = {
    header: null,
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={styles.baseContainer}>
            <View style={styles.title}>
              <Text>Clientes</Text>
            </View>
            <FAB
                style={styles.fab}
                small
                icon="add"
                onPress={() => console.log('Pressed')}
              />
            <View style={styles.bodyContainer}>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                {context.state.customers.map(customer => {
                  return (
                    <TouchableNativeFeedback key={customer.id} onPress={() => console.log('hola')}>
                      <Row styleName="small">
                        <Icon name="user-profile"/>
                        <Text>{customer.name}</Text>
                        <Icon styleName="disclosure" name="right-arrow" />
                      </Row>
                    </TouchableNativeFeedback>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}
      </AppContext.Consumer>
    );
  }
} 

const styles = StyleSheet.create({
  addCustomerButton: {
    color: '#596ab8'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    height: 500
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  navigationBar: {
    marginBottom: 5,
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:40,
    paddingBottom: 20,
    height: 'auto',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    marginBottom: 20
  },
});