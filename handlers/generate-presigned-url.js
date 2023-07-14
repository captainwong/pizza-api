'use strict'

const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const config = require('../config.json');

function generatePresignedUrl() {
    const params = {
        Bucket: config.s3_bucket_name,
        Key: uuid(),
        ACL: 'public-read',
        Expires: 120, // 120s
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err)
                return reject(err);
            resolve({ url: url });
        });
    });
}

module.exports = generatePresignedUrl;
