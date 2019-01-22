var objectId = require('../utils/id_generator');

export default class Deposit {
    constructor(customer, ammount) {
        this.sale = {
            id: objectId(),
            date: new Date(),
            customer: customer,
            ammount: ammount
        }
    }
}