import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

import AppContext from '../context/AppContext';

export default class AddNewCustomer extends React.Component {
  state = {}

  componentDidMount(){
    console.log(this.props);
    
  }

  _handleInputChange = (text, inputName) => {
    this.setState({
      [inputName]:text
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Provider>
            <View>
              <Portal>
                <Dialog
                  visible={this.props.visible}
                  onDismiss={this.props._hideDialog}>
                  <Dialog.Title>Agregar nuevo cliente</Dialog.Title>
                  <Dialog.ScrollArea>
                    <ScrollView>
                      <TextInput
                        label="Nombre"
                        mode="outlined"
                        value={this.state['name']}
                        onChangeText={text => this._handleInputChange(text, 'name')}
                      />
                      <TextInput
                        label="Teléfono"
                        mode="outlined"
                        value={this.state['phone']}
                        onChangeText={text => this._handleInputChange(text, 'phone')}
                      />
                      <TextInput
                        label="Dirección"
                        mode="outlined"
                        value={this.state['address']}
                        onChangeText={text => this._handleInputChange(text, 'address')}
                      />
                    </ScrollView>
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                  <Button onPress={e => context.addCustomer(this.state.name, this.state.phone, this.state.address)}>Agregar</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </Provider>
        )}
      </AppContext.Consumer>
    );
  }
}