import React from 'react';

import { ScrollView, Vibration, View } from 'react-native';
import { Button, Dialog, Divider, List, Portal, Text, TouchableRipple } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: []
    }
  }
  
  _handleSale = (addSale) => {
    if(addSale(this.props.cartItems)) {
      console.log('hola');
      this.props._hideDialog();
      this.props._setView(1, this.props.customer);
    }
  }

  _handleLongPress = () => {
    console.log('hola');
    
    Vibration.vibrate(100, true);
  }

  _handleCancel = () => {
    this.props._clearCart();
  }

  render() {
    return (
      <AppContext>
        {context => (
          <Portal>
            <Dialog
              visible={this.props.visible}
              onDismiss={this.props._hideDialog}>
              <Dialog.Title>Carrito</Dialog.Title>
              <Dialog.ScrollArea>
                <ScrollView>
                  <View style={{display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                    <Text style={{flex: 1, textAlign: 'center'}}>Cerveza</Text>
                    <Text style={{flex: 1, textAlign: 'center'}}>Cantidad</Text>
                    <Text style={{flex: 1, textAlign: 'center'}}>Precio</Text>
                    <Text style={{flex: 1, textAlign: 'center'}}>Subtotal</Text>
                  </View>
                  <Divider/>
                  
                  {this.props.cartItems.map((item, i) => {
                    return (
                      <Item key={i} beers={context.state.beers} item={item} _handleLongPress={this._handleLongPress}/>
                    );
                  })}
                  
                  <Divider/>

                  <List.Item style={{paddingLeft: 5}} right={props => <Text>Total: ${this.props.cartItems.reduce((accum, item) => accum + item.ammount * context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price), 0)}</Text>}/>
                  
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button onPress={this.props._hideDialog} theme={Theme}>Atrás</Button>
                <Button onPress={this._handleCancel} theme={Theme}>Cancelar</Button>
                <Button onPress={() => this._handleSale(context.addSale)} theme={Theme}>Finalizar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </AppContext>
    );
  }
}

class Item extends React.Component {

  render() {
    return (
      <TouchableRipple onPress={() => console.log('adios')} onLongPress={() => this.props._handleLongPress()} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', height: 50}}>
          <Text style={{flex: 1, textAlign: 'center'}}>{this.props.beers.filter(beer => beer.id === this.props.item.beer).map(beer => beer.name)}</Text>
          <Text style={{flex: 1, textAlign: 'center'}}>{this.props.item.ammount}</Text>
          <Text style={{flex: 1, textAlign: 'center'}}>${this.props.beers.filter(beer => beer.id === this.props.item.beer).map(beer => beer.selling_price)}</Text>
          <Text style={{flex: 1, textAlign: 'center'}}>${this.props.beers.filter(beer => beer.id === this.props.item.beer).map(beer => beer.selling_price * this.props.item.ammount)}</Text>
        </View>
      </TouchableRipple>
    );
  }
}