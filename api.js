'use strict'

const API = require('claudia-api-builder');
const api = new API();

const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const getOrders = require('./handlers/get-orders');
const updateDeliveryStatus = require('./handlers/update-delivery-status');

const config = require('./config.json');

api.registerAuthorizer('userAuthentication', {
    providerARNs: [config.cognito_user_pool_arn],
});


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
    return createOrder(req);
}, {
    success: 201,
    error: 400,
    cognitoAuthorizer: 'userAuthentication',
});

api.put('orders/{id}', (req) => {
    return updateOrder(req.pathParams.id, req.body);
}, {
    error: 400,
    cognitoAuthorizer: 'userAuthentication',
});

api.delete('orders/{id}', (req) => {
    return deleteOrder(req.pathParams.id, req.context.authorizer.claims);
}, {
    success: 200,
    error: 400,
    cognitoAuthorizer: 'userAuthentication',
});

api.post('/delivery', req => updateDeliveryStatus(req.body), {
    success: 200,
    error: 400,
    cognitoAuthorizer: 'userAuthentication',
});

module.exports = api;
