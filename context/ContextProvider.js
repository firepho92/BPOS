import React, {Component} from 'react';

import AppContext from './AppContext';

import ObjectId from '../utils/id_generator';//temporary just for developing

import DocumentIO from '../models/documentIO';
import Customer from '../models/customer';

import data from './data';

let documentIO = new DocumentIO();

class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            sales: [],
            deposits: [],
            beers: [],
            customers: []
        }
    }

    componentDidMount() {
        //this.readData();
        this.setState({
            beers: data.beers,
            customers: data.customers,
            deposits: data.deposits,
            sales: data.sales
        })
    }

    //customers
    addCustomer = async (name, phone, address) => {
        var customer = new Customer(name, phone, address);        
        this.setState(prevState => ({
            customers: [...prevState.customers, customer.customer]
        }));        
    }

    //beers
    addBeer = async (beer) => {
        this.setState(prevState => ({
            beers: [...prevState.beers, beer]
        }));
    }

    storeData = async () => {
        let result = await documentIO.writeDocument(this.state);
        console.log(result);
    }

    readData = async () => {
        let result = await documentIO.readDocument();
        result = JSON.parse(result);
        this.setState(result);
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                storeData: this.storeData,
                readData: this.readData,
                addCustomer: this.addCustomer,
                addBeer: this.addBeer
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default ContextProvider;