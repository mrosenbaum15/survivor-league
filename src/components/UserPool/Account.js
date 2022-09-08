import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { createContext, useEffect } from 'react';
import UserPool from './UserPool';

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async (setNewSession) => {

    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            setNewSession(session);
            document.getElementById('account-id').innerHTML = 'Acount'// = <Nav.Link id='account-id' reloadDocument style={{position: 'absolute', right: '25px'}} as={Link} to="/login">Balls</Nav.Link>
            if((!session || session['idToken']['payload']['cognito:groups']) && session['idToken']['payload']['cognito:groups'][0] !== 'admin') {
              if(document.getElementById('admin-link')) document.getElementById('admin-link').remove();
            }
            
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
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
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