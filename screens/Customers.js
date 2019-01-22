import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {Icon, Row} from '@shoutem/ui';
import { Appbar, DefaultTheme, FAB } from 'react-native-paper';

import AppContext from '../context/AppContext';

export default class Customers extends React.Component {

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={styles.baseContainer}>
            <Appbar.Header theme={AppBarTheme}>
              <Appbar.Content
                title='Clientes'
              />
            </Appbar.Header>
            <FAB
              theme={FABTheme}
              style={styles.fab}
              small
              icon="add"
              onPress={() => console.log('Pressed')}
            />
            <View style={styles.bodyContainer}>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                {context.state.customers.map(customer => {
                  return (
                    <TouchableNativeFeedback key={customer.id} onPress={() => this.props._setView(1, customer)}>
                      <Row styleName="small">
                        <Icon name="user-profile" style={{color: '#4c5882'}}/>
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

const AppBarTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
  }
}

const FABTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#5b7ce5',
  }
}

const styles = StyleSheet.create({
  addCustomerButton: {
    color: '#596ab8'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  bodyContainer: {
    height: 465
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