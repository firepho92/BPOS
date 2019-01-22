var objectId = require('../utils/id_generator');

export default class Sale {
    constructor(customer, ammount) {
        this.sale = {
            id: objectId(),
            date: new Date(),
            customer: customer,
            beer: beer,
            ammount: ammount
        }
    }
}