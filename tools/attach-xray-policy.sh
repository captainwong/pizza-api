#!/bin/bash

aws iam \
    attach-role-policy \
    --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
    --role-name pizza-api-executor \
    --region us-east-1 \
    --output json
    