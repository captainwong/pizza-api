const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

function createOrder(req) {
    if (!req || !req.pizzaId || !req.address)
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');

    return docClient.put({
        TableName: 'pizza-orders',
        Item: {
            orderId: uuid.v4(),
            pizza: req.pizza,
            address: req.address,
            orderStatus: 'pending',
        }
    })
        .promise()
        .then((res) => {
            console.log('Order is saved!', res);
        }).catch((e) => {
            console.log(`Oops, order is not saved :(`, e);
            throw e;
        });
}

module.exports = createOrder;
