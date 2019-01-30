import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Appbar, DefaultTheme, FAB, List, Provider, TouchableRipple } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import Theme from './Theme';

import AppContext from '../context/AppContext';

import DefineQuantity from './DefineQuantity';
import Cart from './Cart';

const FABAnimated = Animatable.createAnimatableComponent(FAB);

import objectId from '../utils/id_generator';

import Sale from '../models/sale';

export default class SaleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      quantityOpen: false,
      ticket: '',
      visible: false,
      beer_id: null
    }
  }

  _addItemToCart = (beer_id, quantity) => {
    let sale = new Sale(this.state.ticket, new Date(), this.props.customer.id, beer_id, quantity);
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, sale.sale],
      quantityOpen: false
    }));
    return true;
  }

  _showDialog = () => {
    this.setState({
      visible: true
    });
  }

  _hideDialog = () => {
    this.setState({
      visible: false
    });
  }

  _showQuantityDialog = (beer_id) => {
    this.setState({
      quantityOpen: true,
      beer_id: beer_id
    });
  }

  _hideQuantityDialog = () => {
    this.setState({
      quantityOpen: false
    });
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
      <Provider>
        <AppContext>
          {context => (
            <View style={styles.baseContainer}>
              <DefineQuantity visible={this.state.quantityOpen} _hideQuantityDialog={this._hideQuantityDialog} _addItemToCart={this._addItemToCart} beer_id={this.state.beer_id}/>
              {this.state.cartItems.length > 0 ? <Cart visible={this.state.visible} _hideDialog={this._hideDialog} cartItems={this.state.cartItems} _setView={this.props._setView} cutomer={this.props.customer}/> : null}
              <Appbar.Header theme={Theme}>
                <Appbar.BackAction
                  onPress={() => this.props._setView(1, this.props.customer)}
                />
                <Appbar.Content
                  title="Agregar al carrito"
                  onPress={() => console.log(context.state.beers)}
                />
              </Appbar.Header>
              <View style={styles.body}>
                <View style={styles.dinamicContent}>
                  <ScrollView>
                    {context.state.beers.map((beer, i) => {
                      return (
                        <TouchableRipple key={beer.id} onPress={() => this._showQuantityDialog(beer.id)}>
                          <List.Item left={props => <List.Icon {...props} icon="fiber-manual-record" color={beer.color} id={beer.id}/>} title={beer.name} right={props => <List.Icon {...props} icon="add"/>}/>
                        </TouchableRipple>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
              {this.state.cartItems.length > 0 ? <FABAnimated animation="swing" iterationCount="infinite" duration={0} easing="ease-out" theme={fabTheme} style={styles.fab} icon="shopping-cart" onPress={() => this._showDialog()}/> : <FAB animation="swing" iterationCount="infinite" duration={0} easing="ease-out" theme={fabTheme} style={styles.fab} icon="shopping-cart" onPress={() => this._showDialog()}/>}
              
            </View>
          )}
        </AppContext>
      </Provider>
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

const fabTheme = {
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
    padding: 10
  },
  dinamicContent: {
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