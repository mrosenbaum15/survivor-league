import React from 'react';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import CurrentWeek from './components/CurrentWeek/CurrentWeek';
import EnterPicks from './components/EnterPicks/EnterPicks';
import Standings from './components/Standings/Standings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar bg="dark" variant="dark"> 
            <Container>
              <Nav className="m-auto">
                <Nav.Link as={Link} to="/enterPicks">Enter Picks</Nav.Link>
                <Nav.Link as={Link} to="/curretWeek">Current Week</Nav.Link>
                <Nav.Link as={Link} to="/standings">Standings</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/currentWeek" element={<CurrentWeek/>}/>
            <Route path="/enterPicks" element={<EnterPicks/>}/>
            <Route path="/standings" element={<Standings/>}/>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
