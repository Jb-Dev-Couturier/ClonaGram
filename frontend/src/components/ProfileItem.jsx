import React from 'react';
import {Button, ListGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProfilImage from '../styles/assets/defaultProfile.png';


export default function ProfileItem({
  username,
  first_name,
  last_name,
  photo,
  email,
  followers,
  idx
}) {
  const navigate = useNavigate();
  return (
    <ListGroup.Item
      className="ProfileItem" 
    >
      <div className="d-flex align-items-center justify-content-between" >
        <div className="d-flex align-items-center">
          <img
            src={photo ? photo.asset.url : ProfilImage}
            alt="user-pic"
            className="profilImage"
          />

          <div>
            <p className="px-2 m-0">
              <strong>{email}</strong>
            </p>
            <p className="px-2 m-0">{username}</p>
            <p className="px-2 m-0">
              {(first_name ? first_name : '') +
                '' +
                (last_name ? last_name : '')}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className="px-2">
            <strong>{followers} : Followers</strong>
          </p>
          <Button
            variant="warning"
            className="px-2 m-0"
            onClick={() => navigate('/profile/' + username)}
          >
            Voir
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}
