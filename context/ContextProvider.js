import React, {Component} from 'react';

import AppContext from './AppContext';

import ObjectId from '../utils/id_generator';//temporary just for developing

import DocumentIO from '../models/documentIO';
import Customer from '../models/customer';

let documentIO = new DocumentIO();

class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            beers: [
                {
                    id: ObjectId(),
                    name: 'Diablo',
                    type: 'Red Ale',
                    selling_price: 35,
                    cost_price: 25,
                    stock: 100,
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Tritón',
                    type: 'American Pale Ale',
                    selling_price: 35,
                    cost_price: 25,
                    stock: 100,
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Porter',
                    type: 'Porter',
                    selling_price: 35,
                    cost_price: 25,
                    stock: 100,
                    status: true
                }
            ],
            customers: [
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Tiendita',
                    phone: '555-1234',
                    address: 'Alguno',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Tiendita',
                    phone: '555-1234',
                    address: 'Alguno',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Tiendita',
                    phone: '555-1234',
                    address: 'Alguno',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Tiendita',
                    phone: '555-1234',
                    address: 'Alguno',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
                {
                    id: ObjectId(),
                    name: 'Vidita Mia',
                    phone: '555-1234', 
                    address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
                    status: true
                },
            ]
        }
    }

    componentDidMount() {
        //this.readData();
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