import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_oEQfUGxUw',
  ClientId: '7cus0vcp2jhgiskk0qent1t84h',
};

export default new CognitoUserPool(poolData);