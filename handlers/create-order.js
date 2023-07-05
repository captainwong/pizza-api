const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const rp = require('minimal-request-promise');

function createOrder(req) {
    console.log('createOrder', req);
    if (!req || !req.pizza || !req.address)
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');

    return rp.post('https://some-like-it-hot.effortless-serverless.com/delivery', {
        headers: {
            "Authorization": "aunt-marias-pizzeria-1234567890",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.34pm',
            pickupAddress: 'Aunt Maria Pizzeria',
            deliveryAddress: req.address,
            webhookUrl: 'https://5pnstc4cyk.execute-api.us-east-1.amazonaws.com/latest/delivery',
        })
    })
        .then(res => JSON.parse(res.body))
        .then(res => {
            return docClient.put({
                TableName: 'pizza-orders',
                Item: {
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
