#!/bin/bash

aws lambda \
    update-function-configuration \
    --function-name pizza-api \
    --tracing-config Mode=Active \
    --region us-east-1
    