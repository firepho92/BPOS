import React, {Fragment} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { Appbar, DefaultTheme, FAB, List } from 'react-native-paper';

import AppContext from '../context/AppContext';

export default class Customer extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <AppContext>
        {context => (
          <View style={styles.baseContainer}>
            <Appbar.Header theme={AppBarTheme}>
              <Appbar.BackAction
                onPress={() => this.props._setView(0, null)}
              />
              <Appbar.Content
                title={this.props.customer.name}
              />
            </Appbar.Header>
            <FAB
              theme={FABTheme}
              style={styles.fab}
              small
              icon="add"
              onPress={() => console.log('Pressed')}
            />
            <View style={styles.body}>
              <View style={styles.staticContent}>
                <Text style={{fontWeight: 'bold'}}>Contacto</Text>
                <Text>Teléfono: {this.props.customer.phone}</Text>
                <Text>Dirección: {this.props.customer.address}</Text>
              </View>
              <View style={styles.staticContent}>
                <Text>Saldo pendiente: {context.state.sales.reduce((accum, sale) => accum + sale.ammount * context.state.beers.filter(beer => beer.id === sale.beer).map(beer => beer.selling_price), 0) - context.state.deposits.reduce((accum, deposit) => accum + deposit.ammount, 0)}</Text>
              </View>
              <View style={styles.dynamicContent}>
                <ScrollView>
                  <List.Section title="Movimientos">
                    <List.Accordion title="Ventas">
                      {context.state.sales.filter(sale => sale.customer === this.props.customer.id).map(sale => <List.Item key={sale.id} title={sale.ammount + ''}/>)}
                    </List.Accordion>
                    <List.Accordion title="Depósitos">
                      {context.state.deposits.filter(deposit => deposit.customer === this.props.customer.id).map(deposit => <List.Item key={deposit.id} title={deposit.ammount + ''}/>)}
                    </List.Accordion>
                  </List.Section>
                </ScrollView>
              </View>
            </View>     
          </View>
        )}
      </AppContext>
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
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  body: {
    padding: 10
  },
  dynamicContent: {
    backgroundColor: '#fff',
    padding: 10,
    maxHeight: 250,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  staticContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:40,
    paddingBottom: 20,
    height: 'auto',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  }
});