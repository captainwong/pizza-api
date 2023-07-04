const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateDeliveryStatus(req) {
    if (!req.deliveryId || !req.status)
        throw new Error('Status and delivery ID are required');
    
    return docClient.update({
        TableName: 'pizza-orders',
        Key: {
            orderId: req.deliveryId,
        },
        AttributeUpdates: {
            deliveryStatus: {
                Action: 'PUT',
                Value: req.status,
            }
        }
    }).promise()
        .then(() => {
            return {};
        });
}

module.exports = updateDeliveryStatus;
