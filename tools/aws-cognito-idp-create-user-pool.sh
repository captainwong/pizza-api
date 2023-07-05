#!/bin/bash

# before execute the command,
# 1. visit https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/policies
#    create policy
#    choose "Cognito User Pool" services
#    Specify the desired actions for witch you need permission for (List, Read, etc.)
#    Specify Resources
#    Give name and description of the policy, i.e. CognitoUserPool
#    Create Policy
# 2. go to IAM console --> Users
#    select desired user, for this project, its 'claudia'
#    in permissions tab, click Add Permissions
#    click "Attach existing policy directly"
#    search for the policy name created by step 1., i.e. CognitoUserPool
#    Add Permissions
# 3. for pizza-api lambda to access cognito-idp, 
#    go to IAM console --> roles
#    select desired role for this project, in my case, its "pizz-api-executor"
#    Add Permissions --> Attach Policies
#    search for the policy name created by step 1., i.e. CognitoUserPool
#    Add Permissions

aws cognito-idp create-user-pool \
    --pool-name Pizzaria \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --username-attributes email \
    --query UserPool.Id \
    --output text

# output should look like:
# us-east-1_Qpw0CUpsf