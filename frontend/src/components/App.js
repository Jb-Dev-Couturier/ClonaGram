import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GiWorld, GiArchiveResearch, GiTargetPoster } from 'react-icons/gi';

import AllPosts from './AllPosts';
import AlertDismissible from './AlertDismissible';
import CreatePost from './CreatePost';
import Login from './Login';
import Profile from './Profile';
import Search from './Search';
import SignUp from './SignUp';
import defaulProfil from '../styles/assets/defaultProfile.png';

import { SiInstagram } from 'react-icons/si';
function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState("")
  return (
    <div className="fill-parent">
      <BrowserRouter>
        <Navbar
          collapseOnSelect
          expand="md"
          variant="dark"
          className="NavBar"
          style={{ position: 'sticky' }}
        >
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>
                {' '}
                <SiInstagram className="LogoNav" /> CloneGrame{' '}
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>
                    <GiWorld /> Journal
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                  <Nav.Link>
                    <GiArchiveResearch /> Rechercher
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create-post">
                  <Nav.Link>
                    <GiTargetPoster /> Poster
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {user ? (
                  <Navbar.Text>
                    Bienvenue:{' '}
                    <img
                      src={defaulProfil}
                      alt="userPic"
                      className="profilPicture"
                    />{' '}
                    <Link to={'/profile/' + user}>{user}</Link> |{' '}
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
          <Route element={<AllPosts user={user} />} path="/" exact />
          <Route
            element={<Login setAlert={setAlert} setUser={setUser} />}
            path="/login"
          />
          <Route
            element={<SignUp setAlert={setAlert} setUser={setUser} />}
            path="/sign-up"
          />
          <Route element={<Profile />} path="/profile/:username" />
          <Route element={<Search />} path="/search" />
          <Route
            element={<CreatePost user={user} setAlert={setAlert} />}
            path="/create-post"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
