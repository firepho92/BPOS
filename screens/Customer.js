import React, {Fragment} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Appbar, DefaultTheme, FAB, List, Portal, Provider } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Customer extends React.Component {
  state = {
    open: false
  }
  static navigationOptions = {
    header: null,
  };

  _balance = (sales, beers, deposits) => {
    if(sales.length > 0) {
      return sales.reduce((accum, sale) => accum + sale.ammount * beers.filter(beer => beer.id === sale.beer).map(beer => beer.selling_price), 0) - deposits.reduce((accum, deposit) => accum + deposit.ammount, 0);
    } else {
      return 0;
    }
  }

  _deleteCustomer = (deleteCustomer, showAlert) => {
    if(deleteCustomer(this.props.customer.id)) {
      showAlert('Eliminado correctamente');
      this.props._setView(0, null);
    }
  }

  render() {
    return (
      <Provider>
        <AppContext.Consumer>
          {context => (
            <View style={styles.baseContainer}>
              <Appbar.Header theme={Theme}>
                <Appbar.BackAction
                  onPress={() => this.props._setView(0, null)}
                />
                <Appbar.Content
                  title={this.props.customer.name}
                />
              </Appbar.Header>
              <Portal>
                <FAB.Group
                  open={this.state.open}
                  icon={this.state.open ? 'close' : 'menu'}
                  actions={[
                    { icon: 'clear', label: 'Eliminar', onPress: () => this._deleteCustomer(context.deleteCustomer, context.showAlert)},
                    { icon: 'create', label: 'Editar', onPress: () => console.log('Pressed edit') },
                    { icon: "attach-money", label: 'Vender', onPress: () => console.log('Pressed new sale')},
                  ]}
                  theme={Theme}
                  style={styles.fab}
                  onStateChange={({ open }) => this.setState({ open })}
                  onPress={() => {
                    if (this.state.open) {
                      // do something if the speed dial is open
                    }
                  }}
                  style={{backgroundColor:"rgba(0, 0, 0, 0)"}}
                />
              </Portal>
              <View style={styles.body}>
                <View style={styles.staticContent}>
                  <Text style={{fontWeight: 'bold'}}>Contacto</Text>
                  <Text>Teléfono: {this.props.customer.phone}</Text>
                  <Text>Dirección: {this.props.customer.address}</Text>
                </View>
                <View style={styles.staticContent}>
                  <Text>Saldo pendiente: ${this._balance(context.state.sales.filter(sale => sale.customer === this.props.customer.id), context.state.beers, context.state.deposits)}</Text>
                </View>
                <View style={styles.dynamicContent}>
                  <ScrollView>
                    <List.Section title="Movimientos">
                      <List.Accordion title="Ventas" theme={Theme}>
                        {context.state.sales.filter(sale => sale.customer === this.props.customer.id).map(sale => <List.Item key={sale.id} title={sale.ammount + ''}/>)}
                      </List.Accordion>
                      <List.Accordion title="Depósitos" theme={Theme}>
                        {context.state.deposits.filter(deposit => deposit.customer === this.props.customer.id).map(deposit => <List.Item key={deposit.id} title={deposit.ammount + ''}/>)}
                      </List.Accordion>
                    </List.Section>
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
        </AppContext.Consumer>
      </Provider>
    );
  }
}
const fabtheme = {
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
  body: {
    padding: 10
  },
  dynamicContent: {
    backgroundColor: '#fff',
    padding: 10,
    maxHeight: 250,
    borderRadius: Theme.roundness
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
    marginBottom: 10,
    borderRadius: Theme.roundness
  }
});