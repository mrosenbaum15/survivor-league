import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import UserPool from './UserPool';
import { AccountContext } from './Account';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm'
import VerifyAccountForm from './VerifyAccountForm/VerifyAccountForm'
import './styles/login.css';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotUser, setForgotUser] = useState('');
  const [forgotPasswordVal, setForgotPasswordVal] = useState('');

  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [authMode, setAuthMode] = useState("signin");

  const [newSession, setNewSession] = useState(undefined);
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [enterUsername, setEnterUsername] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const [status, setStatus] = useState(false);
  const { authenticate, getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession(setNewSession)
      .then((session) => {
        console.log('Session Activated');
        setStatus(true);
      })
      .catch((err) => {
        console.log('Session: ', err);
        setStatus(false);
      });
  }, [status]);

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  }

  function setupNewUser() {
    console.log('Setting Up New User');
    axios.put('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/setup-new-user', {
        headers: {
            'Content-Type': 'application/json'
        },
        'username': newUsername,
        'fullname': newName
    }).then((response) => {
    }).catch((error) => {
        console.log(error);
        alert("Unable to set up new user. Please text 847-630-2489 to complete user setup.");
    })
  }

  const handleLogin =  (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
        window.location.href='/enterPicks';
      })
      .catch((err) => {
        console.log(err);
        alert('Login failure. Please contact the admin for a forgotten password.');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: newEmail,
      })
    );

    attributeList.push(
      new CognitoUserAttribute({
        Name: 'name',
        Value: newName,
      })
    );

    UserPool.signUp(newUsername, newPassword, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up. Please make sure all fields are filled out and password has at least 8 characters, including uppercase and lowercase letters, a number and a special character.");
      } else {
        setVerifyProcess(true);
        setAuthMode('login')
        alert('User Added Successfully');
        setupNewUser();
      }
    });

    // TO-DO: API, need to create the relevant user and all of the default values
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: newUsername,
      Pool: UserPool,
    });
    user.confirmRegistration(confirmationCode, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account. Please contact the admin.");
      } else {
        alert('Account verified successfully');
        window.location.href = '/login';
      }
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: forgotUser,
      Pool: UserPool,
    });
    user.confirmPassword(confirmationCode, forgotPasswordVal, {
        onSuccess: () => {
          alert('Password reset successfully');
          window.location.href = '/login';
        },
        onFailure: (err) => {
          console.log(err);
          alert("Couldn't send verification code. Please make sure all fields are filled out and password has at least 8 characters, including uppercase and lowercase letters, a number and a special character. If you have tried more than 3 times, please wait 15 minutes and try again.");
        }
      }
    );
  };  

  const sendConfirmationCode = (e) =>  {
    if(forgotUser.length < 1) {
      setIsUsernameValid(false);
      return;
    }

    e.preventDefault();
    const user = new CognitoUser({
      Username: forgotUser,
      Pool: UserPool,
    });
    user.forgotPassword(
      {
        onSuccess: () => {
          console.log()
          setEnterUsername(false);
        },
        onFailure: (err) => {
          alert("Couldn't send verification code. Please refresh and try again.");
        },
      }
    );
  }

  if(authMode === 'signup') {
    return (
      <>
        <RegisterForm
          newName={newName}
          newEmail={newEmail}
          newUsername={newUsername}
          newPassword={newPassword}
          setNewName={setNewName}
          setNewEmail={setNewEmail}
          setNewUsername={setNewUsername}
          setNewPassword={setNewPassword}
          changeAuthMode={changeAuthMode}
          handleRegister={handleRegister}
        />
      
      </>

      )
    }

  if(verifyProcess) {
    return (
      <VerifyAccountForm
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        handleVerify={handleVerify}
        isValid={true}
        formCaption={'A confirmation code has been sent to ' + newEmail}
        formPlaceholder='Enter confirmation code'
        submitCaption='Verify'
      />
    )
  }

  // enter  email to prompt for confirmation code
  if(forgotPassword && enterUsername) {
    return (
      <VerifyAccountForm
        confirmationCode={forgotUser}
        setConfirmationCode={setForgotUser}
        handleVerify={sendConfirmationCode}
        isValid={isUsernameValid}
        formCaption='Username'
        formPlaceholder='Enter username'
        submitCaption='Submit'
      />
    )
  }

  // enter confirmation code
  if(forgotPassword && !enterUsername) {
    return (
      <ResetPasswordForm
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        setNewPassword={setForgotPasswordVal}
        handleVerify={handleForgotPassword}
        isValid={true}
        formCaption={'A confirmation code has been sent to ' + forgotUser +'\'s email'}
        formPlaceholder='Enter confirmation code'
        submitCaption='Submit'
      />
    )
  }
  
  if(!status) {
    return (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            changeAuthMode={changeAuthMode}
            setForgotPassword={setForgotPassword}
            handleLogin={handleLogin}
          />

    );
  }
  
  let welcomeText = newSession ? newSession['idToken']['payload']['name'] : 'unknown user';
  return (
    <div className='logged-in-section'>
        Hello, {welcomeText}
        <Button className='logout-button' onClick={logout}>Logout</Button>
    </div>
  )
}

export default Login;