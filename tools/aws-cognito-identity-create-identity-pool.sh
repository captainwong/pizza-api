#!/bin/bash

# for this command to work
# 1. goto IAM console--> Policies --> Create Policy
#    choose "Cognito Ientity"
#    Action allowed: All Cognito Identity actions (cognito-identity:*)
#    Resources: Specific, Any in this account
#    Next
#    give name and description of the policy, i.e. CognitoIdentity
#    Create Policy
# 2. goto IAM console --> Users --> claudia --> Add Permissions --> Attach polices directly
#    Choose "CognitoIdentity"
#    Add Permissions

aws cognito-identity create-identity-pool \
    --identity-pool-name Pizzeria \
    --allow-unauthenticated-identities \
    --supported-login-providers graph.facebook.com=1392752041662707 \
    --cognito-identity-providers ProviderName=cognito-idp.us-east-1.amazonaws.com/us-east-1_Qpw0CUpsf,ClientId=633arc44beogqpgchveg87r5ji,ServerSideTokenCheck=false \
    --query IdentityPoolId \
    --output text

# output should looks like:
# us-east-1:9324e0eb-92b8-4731-8642-509ca6e87f4e
