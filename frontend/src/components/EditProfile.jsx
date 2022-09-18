import { useState,useEffect} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import defaulProfil from '../styles/assets/defaultProfile.png';


export default function EditProfile({
  show,
  hideCallback,
  user,
  setAlert,
  profileData,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [livesIn, setLivesIn] = useState("");
  const [workAt, setWorkAt] = useState("");
  const [file, setFile] = useState('');

  useEffect(() => {
    setFirstName(profileData.first_name);
    setLastName(profileData.last_name);
    setBio(profileData.bio);
    setUserName(profileData.username);
    setEmail(profileData.email);
    setBirthday(profileData.birthday);
    setLivesIn(profileData.livesin);
    setWorkAt(profileData.workat);
  }, [profileData]);
  

  function updateProfile() {
    const formData = new FormData();

    formData.append('file', file );
    
    formData.append('user', user);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', userName);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('birthday', birthday);
    formData.append('livesin', livesIn);
    formData.append('workat', workAt);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch('/updateProfile', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setAlert({
          variant: 'success',
          message: 'Votre Profile à été Mis A jour !',
        });
        hideCallback(data);
        
      })
      .catch((err) => {
        setAlert({ variant: 'danger', message: err.message });
        hideCallback();
      });
  }
          
  return (
    <Modal className="EditProfile" show={show} onHide={hideCallback}>
      <Modal.Header closeButton>
        <Modal.Title>Editer le Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            {profileData.photo && !file ? (
              <img
                src={
                  profileData.photo.asset.url
                    
                }
                alt="user-pic"
                className="upload-image"
              />
            ) : (
              <img
                alt="user-pic"
                src={file ? URL.createObjectURL(file) : defaulProfil}
                className="upload-image"
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nom"
              defaultValue={profileData.first_name}
              onInput={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Prenom"
              defaultValue={profileData.last_name}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pseudo"
              defaultValue={profileData.username}
              onInput={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              defaultValue={profileData.email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Bio"
              defaultValue={profileData.bio}
              onInput={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Anniversaire"
              defaultValue={profileData.birthday}
              onInput={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Domicile"
              defaultValue={profileData.livesin}
              onInput={(e) => setLivesIn(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Travail à"
              defaultValue={profileData.workat}
              onInput={(e) => setWorkAt(e.target.value)}
            />
          </Form.Group>
          <div>
            <Button variant="outline-primary" onClick={updateProfile}>
              Mettre a jour
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
