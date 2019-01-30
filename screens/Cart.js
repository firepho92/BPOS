import React from 'react';

import { ScrollView, View } from 'react-native';
import { Button, Dialog, Divider, List, Portal, Surface, Text } from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class Cart extends React.Component {
  
  handleSale = (addSale) => {
    if(addSale(this.props.cartItems)) {
      this.props._hideDialog();
      this.props._setView(1, this.props.customer);
    }
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
                    <Text style={{flex: 1, textAlign: 'center'}}> </Text>
                  </View>

                  <Divider/>
                  
                  {this.props.cartItems.map((item, i) => {
                    return (
                      <Surface style={{display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5, elevation: 2, borderRadius: 5, height: 15}} key={i}>
                        <Text style={{flex: 1, textAlign: 'center'}}>{context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.name)}</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>{item.ammount}</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>${context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price)}</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>${context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price * item.ammount)}</Text>
                        <View style={{flex: 1, width: 10}}><Text style={{color: '#FF1744', textAlign: 'center'}} onPress={() => console.log('pressed ' + item.beer)}>X</Text></View>
                      </Surface>
                    );
                  })}
                  
                  <Divider/>

                  <List.Item style={{paddingLeft: 5}} right={props => <Text>Total: ${this.props.cartItems.reduce((accum, item) => accum + item.ammount * context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price), 0)}</Text>}/>
                  
                </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions>
                <Button onPress={this.props._hideDialog} theme={Theme}>Atrás</Button>
                <Button onPress={() => this.handleSale(context.addSale)} theme={Theme}>Finalizar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </AppContext>
    );
  }
}
