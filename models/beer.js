var objectId = require('../utils/id_generator');

export default class Beer {
    constructor(name, type, selling_price, cost_price, stock, status) {
        this.beer = {
            id: objectId(),
            name: name,
            type: type,
            selling_price: selling_price,
            cost_price: cost_price,
            stock: stock,
            status: status
        }
    }
}