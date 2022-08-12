import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { createContext, useEffect } from 'react';
import UserPool from './UserPool';

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async (setNewSession) => {

    console.log("GETTING SESSION");
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            console.log(session);
            setNewSession(session);
            document.getElementById('account-id').innerHTML = 'Welcome, ' + session['idToken']['payload']['name']// = <Nav.Link id='account-id' reloadDocument style={{position: 'absolute', right: '25px'}} as={Link} to="/login">Balls</Nav.Link>
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('login success', result);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };