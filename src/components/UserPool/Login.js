import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState, useContext, useEffect } from 'react';
import {Button, Form, Modal, Link} from 'react-bootstrap';
import UserPool from './UserPool';
import { AccountContext } from './Account';
import './styles/login.css'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newUserName, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [authMode, setAuthMode] = useState("signin");
  const [showModal, setShowModal] = useState(true);

  const [status, setStatus] = useState(false);
  const { authenticate, getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
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


  const handleLogin =  (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
        console.log(data);
        alert('login success');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert('login failure');
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
    UserPool.signUp(newUserName, newPassword, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        alert('User Added Successfully');
      }
    });
  };

  if(authMode === 'signup') {
    return (
      <>
        <div className='login-section'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmaillSignup">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                  </Form.Text>
              </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNamelSignup">
                <Form.Label>Username</Form.Label>
                <Form.Control value={newUserName} onChange={(e) => setNewUsername(e.target.value)} type="username" placeholder="Enter username" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignup">
                <Form.Label>Password</Form.Label>
                <Form.Control value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <div>
              Already have an account?  
              <Button className='anchor-button' onClick={changeAuthMode}>Sign in</Button>
            </div>
              
          </Form>
          <Button onClick={handleRegister} variant="primary">Create Account</Button>
        </div>
      </>

      )
    }
    
    if(!status) {
      return (
          <>
            <div className='login-section'>
              <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter username" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <div>
                  Don't have an account?  
                  <Button className='anchor-button' onClick={changeAuthMode}>Sign up</Button>
                </div>
                  
              </Form>
              <Button onClick={handleLogin} variant="primary">Login</Button>
            </div>
          </>       
      );
    }
    
    return (
      <div className='logged-in-section'>
          You are logged in.
          <Button onClick={logout}>Logout</Button>
      </div>
    )
}

export default Login;