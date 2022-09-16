import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setAlert, setUser }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function createAccount() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }),
    };
    fetch('/createUser', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAlert({ 
          variant: 'success', 
          message: 'Votre Compte a été créer',
       })
       setUser(data.username);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  function updateUsername(e) {
    setUsername(e.target.value);
  }
  function updateFirstName(e) {
    setFirstName(e.target.value);
  }
  function updateLastname(e) {
    setLastName(e.target.value);
  }
  function updateEmail(e) {
    setEmail(e.target.value);
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <Form className="signUpForm">
      {/* username */}
      <Form.Group className="mb-4">
        <Form.Label>Pseudo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Votre Pseudo"
          onInput={updateUsername}
        />
      </Form.Group>
      {/* firstname */}
      <Form.Group className="mb-4">
        <Form.Label>Prenom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Votre Prenom"
          onInput={updateFirstName}
        />
      </Form.Group>
      {/* lastname */}
      <Form.Group className="mb-4">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Votre Nom"
          onInput={updateLastname}
        />
      </Form.Group>
      {/* Email */}
      <Form.Group className="mb-4">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Votre mail"
          onInput={updateEmail}
        />
      </Form.Group>
      {/* username */}
      <Form.Group className="mb-4">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Votre Mot de passe"
          onInput={updatePassword}
        />
      </Form.Group>
      <Button variant="outline-primary" type="button" onClick={createAccount}>
        Crée Compte
      </Button>
    </Form>
  );
}
