import React, {Fragment} from 'react';

import Customers from './Customers';
import Customer from './Customer';

export default class HomeScreen extends React.Component {
  state = {
    view: 0,
    customer: null
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
      <Fragment>
        {this.state.view === 0 ? <Customers _setView={this._setView}/> : <Customer customer={this.state.customer} _setView={this._setView} />}
      </Fragment>
    );
  }
}