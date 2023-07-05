#!/bin/bash

# for this to work
# go to cognito console --> Identity Pool --> Pizzeria --> Edit identity pool
# on `Unauthenticated role` and `Authenticated role`, click `Create new role`
# click Allow
# click Save Changes
# go ot cognito console --> Ientity Pool --> Pizzeria
# switch to "User access" tab
# in the "Authenticated access", copy the "Authenticated role ARN"
# in the "Guest access", copy the "Guest role ARN"



aws cognito-identity set-identity-pool-roles \
    --identity-pool-id us-east-1:9324e0eb-92b8-4731-8642-509ca6e87f4e \
    --roles authenticated=arn:aws:iam::397881640223:role/Cognito_PizzeriaAuth_Role,unauthenticated=arn:aws:iam::397881640223:role/Cognito_PizzeriaUnauth_Role 

# no output means its alright
