import React from 'react';

import { Animated, ScrollView, StyleSheet, Vibration, View } from 'react-native';
import { Button, Dialog, Divider, List, Portal, Text, TouchableRipple } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: []
    }
  }
  
  _handleSale = (addSale) => {
    if(addSale(this.props.cartItems)) {
      console.log('hola');
      this.props._hideDialog();
      this.props._setView(1, this.props.customer);
    }
  }

  _handleLongPress = (beer_id) => {
    this._addSelected(beer_id);
    
    Vibration.vibrate(100, true);
  }

  _addSelected = (beer_id) => {
    this.setState(prevState => ({
      selectedIndex: [...prevState.selectedIndex, beer_id]
    }))
  }

  _removeSelected = (beer_id) => {
    let index = 0;
    let selectedIndexes = this.state.selectedIndex;
    for(var i = 0; i < this.state.selectedIndex.length; i++)
      if(this.state.selectedIndex === beer_id) index = i;
    selectedIndexes.splice(index, 1);
    this.setState({
      selectedIndex: selectedIndexes
    });
  }

  _handleCancel = () => {
    this.setState({
      selectedIndex: []
    });
    this.props._clearCart();
  }

  _isSelected = (beer_id) => {
    for(var j = 0; j < this.state.selectedIndex.length; j++)
      if(this.state.selectedIndex[j] === beer_id) return true;
    return false;
  }

  render() {
    return (
      <AppContext.Consumer>
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
                    console.log(this.state.selectedIndex);
                    return (
                      this._isSelected(item.beer) ? <SelectedItem key={i} beer={item.beer} _removeSelected={this._removeSelected}/> : <Item key={i} beers={context.state.beers} item={item} beer={item.beer} _handleLongPress={this._handleLongPress}/>
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
      </AppContext.Consumer>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <TouchableRipple onPress={() => console.log('adios')} onLongPress={() => this.props._handleLongPress(this.props.beer)} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
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

class SelectedItem extends React.Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  animateBackgroundColor = () => {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }

  componentDidMount() {
    this.animateBackgroundColor();
  }

  render() {
    const backgroundColorVar = this.animatedValue.interpolate(
    {
      inputRange: [ 0, 1 ],
      outputRange: [ '#96b5f6', '#2b6aeb' ]
    });

    return(
      <Animated.View style = {[ styles.container, { backgroundColor: backgroundColorVar } ]}>
        <Text style={ styles.text }>Eliminar</Text>
        <Text style={ styles.text } onPress={() => this.props._removeSelected(this.props.beer)}>Cancelar</Text>
      </Animated.View>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 50,
    },
 
    text: {
      color: 'white'
    }
});