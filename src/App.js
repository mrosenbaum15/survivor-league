import React from 'react';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import CurrentWeek from './pages/CurrentWeek/CurrentWeek';
import EnterPicks from './pages/EnterPicks/EnterPicks';
import Standings from './pages/Standings/Standings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Account } from './components/UserPool/Account';
import Login from './components/UserPool/Login';
import Register from './components/UserPool/Register';
import Status from './components/UserPool/Status';

function App() {
  return (

        <Account>
          <Status/>
          <BrowserRouter>
            <Navbar fixed="top" bg="dark" variant="dark"> 
              <Container>
                <Navbar.Brand href="#home">House of Paign</Navbar.Brand>
                  <Nav className="m-auto" style={{paddingRight: "100px"}}>
                    <Nav.Link as={Link} to="/enterPicks">Enter Picks</Nav.Link>
                    <Nav.Link as={Link} to="/currentWeek">Current Week</Nav.Link>
                    <Nav.Link as={Link} to="/standings">Standings</Nav.Link>
                    <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                  </Nav>
              </Container>
            </Navbar>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/currentWeek" element={<CurrentWeek/>}/>
              <Route path="/enterPicks" element={<EnterPicks/>}/>
              <Route path="/standings" element={<Standings/>}/>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
          </BrowserRouter>
        </Account>

  );
}

export default App;
