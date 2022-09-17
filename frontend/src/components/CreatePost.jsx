import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FcAddImage } from 'react-icons/fc';

export default function CreatePost({ user, setAlert }) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setAlert({
        variant: 'danger',
        message: 'Connectez vous pour créer un post',
      });
      navigate('/login');
    }
  }, [user]);

  function uploadFile(e) {
    setFile(e.target.files[0])
  }
  function makePost() {}

  return (
    <Form className="post-Form Post">
      <div className="createPost">
        <Form.Group className="mb-3 container-img">
          <img
            src={file ? URL.createObjectURL(file) : null}
            alt={file ? 'poster-pic' : null}
            className={file ? 'upload-image' : 'upload-image-none'}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="icon">
            <>
              <input type="file" accept="image/*" onChange={uploadFile} />
              <FcAddImage className="iconSvg" />
            </>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Votre message ici"
            onInput={(e) => setCaption(e.target.value)}
          />
        </Form.Group>
        <div className="post-button-wrapper">
          <Button
            variant="outline-primary"
            type="button"
            onClick={makePost}
            className="post-button"
          >
            Partager
          </Button>
        </div>
      </div>
    </Form>
  );
}
