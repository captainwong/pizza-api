#!/bin/bash

# `user-pool-id` is the output of `./aws-cognito-idp-create-user-pool.sh`

aws cognito-idp create-user-pool-client \
    --user-pool-id us-east-1_Qpw0CUpsf \
    --client-name PizzeriaClient \
    --no-generate-secret \
    --query UserPoolClient.ClientId \
    --output text

# output should looks like:
# 633arc44beogqpgchveg87r5ji
