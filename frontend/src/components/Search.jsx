import React, { useState } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import ProfileItem from './ProfileItem';

export default function Search() {
  const [searchText, updateSearchText] = useState('');
  const [searchResults, updateSearchResults] = useState([]);

  function search() {
    fetch('/searchForUsername?text=' + searchText)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateSearchResults(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="Search">
      <div className="searchWrapper">
        <Form className="search-form">
          <Form.Group className="search-field">
            <Form.Control
              type="text"
              onInput={(e) => updateSearchText(e.target.value)}
              placeholder="Rechercher un utilisateur"
            />
          </Form.Group>
          <Button variant="outline-primary" onClick={search}>
            Recherche
          </Button>
        </Form>
        {searchResults.length > 0 ? (
          <div className="search-results-wrapper">
            <Card style={{ width: '100%' }}>
              <ListGroup variant="flush" style={{gap:'20px'}}>
                {searchResults.map((item, idx) => (
                  <ProfileItem {...item} key={idx} />
                ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          <p>Pas de resultats</p>
        )}
      </div>
    </div>
  );
}
