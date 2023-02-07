import React, {useEffect, useState, useContext} from 'react';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import CurrentWeek from './pages/CurrentWeek/CurrentWeek';
import EnterPicks from './pages/EnterPicks/EnterPicks';
import Standings from './pages/Standings/Standings';
import Rules from './pages/Rules/Rules';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Account } from './components/UserPool/Account';
import Login from './components/UserPool/Login';
import Register from './components/UserPool/Register';
import { AccountContext } from './components/UserPool/Account';

function App() {

  const { getSession } = useContext(AccountContext);
  const [newSession, setNewSession] = useState(undefined);
  const [status, setStatus] = useState(false);


  useEffect(() => {
    getSession(setNewSession)
      .then((session) => {
        console.log('Session Activated');
        setStatus(true);
      })
      .catch((err) => {
        console.log('Session: ', err);
        setStatus(false)
      });
  }, []);

  if(!status) {
    return (
      <BrowserRouter>
            <Navbar fixed='top' bg='dark' variant='dark' style={{right:'0'}}> 
              <Container>
                <Navbar.Brand href='/'>House of Paign</Navbar.Brand>
                  <Nav className='m-auto' style={{paddingRight: '100px'}}>
                    <Nav.Link id='account-id' reloadDocument style={{position: 'absolute', right: '5px', bottom: '10px'}} as={Link} to='/login'>Sign In</Nav.Link>
                  </Nav>
              </Container>
            </Navbar>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login/>} />
            </Routes>
          </BrowserRouter>
    )
  }

  return (

        <Account>
          <BrowserRouter>
            <Navbar expand='md' bg='dark' variant='dark' style={{position: 'relative', overflow:'wrap'}}> 
                <Navbar.Brand style={{paddingLeft:'50px'}} href='/'>House of Paign</Navbar.Brand>
                  <Nav className='m-auto'>
                    <Nav.Link as={Link} to='/enterPicks'>Enter Picks</Nav.Link>
                    <Nav.Link as={Link} to='/currentWeek'>Current Week</Nav.Link>
                    <Nav.Link as={Link} to='/standings'>Standings</Nav.Link>
                    <Nav.Link as={Link} to='/rules'>Rules</Nav.Link>
                    <Nav.Link id='admin-link' as={Link} to='/admin'>Admin</Nav.Link>
                    <Nav.Link  id='account-id' reloadDocument as={Link} to='/login'>Sign In</Nav.Link>
                  </Nav>
            </Navbar>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/currentWeek' element={<CurrentWeek/>}/>
              <Route path='/enterPicks' element={<EnterPicks/>}/>
              <Route path='/standings' element={<Standings/>}/>
              <Route path='/rules' element={<Rules/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/' element={<EnterPicks userInfo={newSession}/>}/>
            </Routes>
          </BrowserRouter>
        </Account>

  );
}

export default App;
