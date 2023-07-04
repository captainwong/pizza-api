'use strict'

const API = require('claudia-api-builder');
const api = new API();


const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const getOrders = require('./handlers/get-orders');

api.get('/', () => 'Welcome to Pizza API');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}', (req) => {
    return getPizzas(req.pathParams.id);
}, {
    error: 404
});

api.get('/orders', () => getOrders());

api.get('/orders/{id}', (req) => {
    return getOrders(req.pathParams.id);
}, {
    error: 404
});

api.post('/orders', (req) => {
    return createOrder(req.body);
}, {
    success: 201,
    error: 400,
});

api.put('orders/{id}', (req) => {
    return updateOrder(req.pathParams.id, req.body);
}, {
    error: 400,
});

api.delete('orders/{id}', (req) => {
    return deleteOrder(req.pathParams.id);
}, {
    error: 400
});


module.exports = api;
