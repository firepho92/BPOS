import ObjectId from '../utils/id_generator';
export default data = {
  beers: [
    {
        id: 1,
        name: 'Diablo',
        type: 'Red Ale',
        selling_price: 35,
        cost_price: 25,
        stock: 100,
        status: true
    },
    {
        id: 2,
        name: 'Tritón',
        type: 'American Pale Ale',
        selling_price: 35,
        cost_price: 25,
        stock: 100,
        status: true
    },
    {
        id: 3,
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
        id: 1,
        name: 'Vidita Mia',
        phone: '555-1234', 
        address: 'Úrsulo Galván #3, Col. Belisario Domínguez',
        status: true
    },
    {
        id: 2,
        name: 'Tiendita',
        phone: '555-1234',
        address: 'Alguno',
        status: true
    },
],
sales: [
  {
    id: ObjectId(),
    date: new Date(),
    customer: 1,
    beer: 1,
    ammount: 10
  },
  {
    id: ObjectId(),
    date: new Date(),
    customer: 1,
    beer: 2,
    ammount: 6
  },
  {
    id: ObjectId(),
    date: new Date(),
    customer: 1,
    beer: 3,
    ammount: 25
  }
],
deposits: [
  {
    id: ObjectId(),
    date: new Date(),
    customer: 1,
    ammount: 100
  }
]

}