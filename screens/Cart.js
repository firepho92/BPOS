import React from 'react';

import { ScrollView } from 'react-native';
import { Button, DataTable, Dialog, List, Portal, Text } from 'react-native-paper';

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
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Cerveza</DataTable.Title>
                      <DataTable.Title numeric>Cantidad</DataTable.Title>
                      <DataTable.Title numeric>$ Unitario</DataTable.Title>
                      <DataTable.Title numeric>Subtotal</DataTable.Title>
                    </DataTable.Header>

                    {this.props.cartItems.map((item, i) => <DataTable.Row key={i}><DataTable.Cell style={{textAlign: 'center'}}>{context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.name)}</DataTable.Cell><DataTable.Cell numeric>{item.ammount}</DataTable.Cell><DataTable.Cell numeric>${context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price)}</DataTable.Cell><DataTable.Cell numeric>${context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price * item.ammount)}</DataTable.Cell></DataTable.Row>)}
                    
                  </DataTable>
                  <List.Item right={props => <Text>Total: ${this.props.cartItems.reduce((accum, item) => accum + item.ammount * context.state.beers.filter(beer => beer.id === item.beer).map(beer => beer.selling_price), 0)}</Text>}/>
                  
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