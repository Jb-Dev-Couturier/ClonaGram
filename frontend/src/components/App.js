import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AllPosts from './AllPosts';
import AlertDismissible from './AlertDismissible';
import CreatePost from './CreatePost';
import Login from './Login';
import Profile from './Profile';
import Search from './Search';
import SignUp from './SignUp';

import { SiInstagram } from 'react-icons/si';
function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState("")
  return (
    <div className="fill-parent">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>
                {' '}
                <SiInstagram /> CloneGrame{' '}
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Journal</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                  <Nav.Link>Rechercher</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create-post">
                  <Nav.Link>Poster</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {user ? (
                  <Navbar.Text>
                    Connectée: <Link to={'/profile/' + user}>{user}</Link> |{' '}
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => {
                        setUser('');
                        setAlert({
                          variant: 'warning',
                          message: 'Vous etes deconnecter!',
                        });
                      }}
                    >
                      Deconnection
                    </Button>
                  </Navbar.Text>
                ) : (
                  <Navbar.Text>
                    <Link to="/login">Se connecter</Link>
                  </Navbar.Text>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {alert ? (
          <AlertDismissible {...alert} deleteAlert={() => setAlert(null)} />
        ) : null}
        <Routes>
          <Route element={<AllPosts />} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route
            element={<SignUp setAlert={setAlert} setUser={setUser} />}
            path="/sign-up"
          />
          <Route element={<Profile />} path="/profile/:username" />
          <Route element={<Search />} path="/search" />
          <Route element={<CreatePost />} path="/create-post" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
