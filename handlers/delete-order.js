const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(orderId) {
    return docClient.delete({
        TableName: 'pizza-orders',
        Key: {
            orderId: orderId,
        }
    })
        .promise()
        .then(res => {
            console.log('Order is deleted!', res);
            return res;
        })
        .catch(e => {
            console.log('Oops, order is not deleted :(', e);
            throw e;
        });
}

module.exports = deleteOrder;
