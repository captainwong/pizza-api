'use strict'

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const rp = require('minimal-request-promise');
const config = require('../config.json');

function createOrder(req) {
    console.log('createOrder', req.body);
    const userData = req.context.authorizer.claims;
    console.log('User Data', userData);
    let userAddress = req.body && req.body.address;
    if (!userAddress) {
        userAddress = JSON.parse(userData.address);
    }
    if (!req.body || !req.body.pizza || !userAddress)
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');

    return rp.post(`${config.some_like_it_hot_delivery}/delivery`, {
        headers: {
            "Authorization": "aunt-marias-pizzeria-1234567890",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.34pm',
            pickupAddress: 'Aunt Maria Pizzeria',
            deliveryAddress: req.address,
            webhookUrl: `${config.myurl}/delivery`,
        })
    })
        .then(res => JSON.parse(res.body))
        .then(res => {
            return docClient.put({
                TableName: 'pizza-orders',
                Item: {
                    cognitoUsername: userData['cognito:username'],
                    orderId: res.deliveryId,
                    pizza: req.pizza,
                    address: req.address,
                    orderStatus: 'pending',
                }
            }).promise();
        }).then((res) => {
            console.log('Order is saved!', res);
            return res;
        }).catch((e) => {
            console.log(`Oops, order is not saved :(`, e);
            throw e;
        });
}

module.exports = createOrder;
