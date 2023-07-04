const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function getOrders(orderId) {
    if (typeof orderId === 'undefined')
        return docClient.scan({
            TableName: 'pizza-orders'
        })
            .promise()
            .then(res => res.Items);
    
    return docClient.get({
        TableName: 'pizza-orders',
        Key: {
            orderId: orderId
        }
    })
        .promise()
        .then(res => res.Item);
}

module.exports = getOrders;
