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
            customers: [],
            alert: {
                visible: false,
                msg: ''
            }
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
        let customer = new Customer(name, phone, address);        
        this.setState(prevState => ({
            customers: [...prevState.customers, customer.customer]
        }));
        return true;        
    }

    deleteCustomer = async (id) => {
        console.log(id);
        let customers = this.state.customers;
        let index = this.state.customers.map((customer, index) => {
            if(customer.id === id) {
                return index;
            }
        }).filter(isFinite);
        console.log(index);
        customers.splice(index, 1);
        return true;
    }

    //beers
    addBeer = async (beer) => {
        this.setState(prevState => ({
            beers: [...prevState.beers, beer]
        }));
    }

    showAlert = (msg) => {
        this.setState({
            alert: {
                visible: true,
                msg: msg
            }
        });
    }

    hideAlert = () => {
        this.setState({
            alert: {
                visible: false,
                msg: ''
            }
        });
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
                deleteCustomer: this.deleteCustomer,
                addBeer: this.addBeer,
                showAlert: this.showAlert,
                hideAlert: this.hideAlert
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default ContextProvider;