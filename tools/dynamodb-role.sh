#!/bin/bash

aws iam put-role-policy \
    --role-name pizza-api-executor \
    --policy-name PizzaPiDynamoDB \
    --policy-document file://../roles/dynamodb.json
