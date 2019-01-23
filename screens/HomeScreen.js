import React, {Fragment} from 'react';

import Customers from './Customers';
import Customer from './Customer';
import AddNewCustomer from './AddNewCustomer';
import {Snackbar} from 'react-native-paper';

import Theme from './Theme';

import AppContext from '../context/AppContext';

export default class HomeScreen extends React.Component {
  state = {
    view: 0,
    customer: null,
  }
  static navigationOptions = {
    header: null,
  };

  _setView = (view, customer) => {
    this.setState({
      view: view,
      customer: customer
    })
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Fragment>
            {this.state.view === 0 ? <Customers _setView={this._setView}/> : null}
            {this.state.view === 1 ? <Customer customer={this.state.customer} _setView={this._setView} /> : null}
            {this.state.view === 2 ? <AddNewCustomer _setView={this._setView}/> : null}
            <Snackbar
              visible={context.state.alert.visible}
              onDismiss={() => context.hideAlert()}
              action={{
                label: 'Cerrar',
                onPress: () => {
                  context.hideAlert()
                },
              }}
              duration={3000}
              theme={Theme}
            >
              {context.state.alert.msg}
            </Snackbar>
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}