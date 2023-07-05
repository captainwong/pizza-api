#!/bin/bash

aws dynamodb scan --table-name pizza-orders --region us-east-1 --output json