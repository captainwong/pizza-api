#!/bin/bash

# see https://stackoverflow.com/questions/53654186/aws-log-get-log-events-log-group-name-problem

MSYS_NO_PATHCONV=1 aws logs \
    filter-log-events \
    --filter-pattern 'deleteOrder' \
    --log-group-name /aws/lambda/pizza-api \
    --region us-east-1 \
    --output text
