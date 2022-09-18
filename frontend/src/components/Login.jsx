import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({setAlert, setUser}) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    fetch('/getProfile?user=' + username)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAlert({
            variant: 'success',
            message: 'Connexion Reussie Amusez Vous bien !',
          });
          setUser(data[0].username);
          navigate('/');
        } else {
          setAlert({ variant: 'danger', message: 'Utilisateur incorrect !' });
        }
      })
      .catch((err) => setAlert({ variant: 'danger', message: err.message }));
  }

  return (
    <Form className="center-Form">
      <Form.Group className="mb-3">
        <Form.Label>Pseudo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Pseudo"
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <small>
          Pas de compte? <Link to={'/sign-up'}>cliquez ici !</Link>
        </small>
      </Form.Group>

      <Button variant="outline-primary" type="button" onClick={handleLogin}>
        Se connecter
      </Button>
    </Form>
  );
}
