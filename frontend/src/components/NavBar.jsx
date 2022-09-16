import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiInstagram } from 'react-icons/si';

import { AiOutlineLogout, AiOutlineLogin, AiOutlineHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MdOutlinePostAdd } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import defaulProfil from '../styles/assets/defaultProfile.png';

const NavBar = ({ setAlert }) => {
  const [user, setUser] = useState('');

  return (
    <header className="Navbar">
      <nav>
        <div className="navContainer">
          <div className="logoContainer">
            <SiInstagram />
            <h3>ClonaGrame</h3>
            <h5>
              Bienvenue : <img src={defaulProfil} alt="userPic" /> {user}
            </h5>
          </div>
          <div className="ulContainer">
            <ul>
              <li>
                <Link to="/">
                  <AiOutlineHome /> Accueil
                </Link>
              </li>
              <li>
                <Link to="/search">
                  <BiSearchAlt /> Recherche
                </Link>
              </li>
              <li>
                <Link to="/create-post">
                  <MdOutlinePostAdd /> Post
                </Link>
              </li>
              <li>
                {user ? (
                  <Link to={'/profile/' + user}>
                    <CgProfile />
                    Profile
                    <AiOutlineLogout
                      onClick={() => {
                        setUser('');
                        setAlert({
                          variant: 'warning',
                          message: 'Vous etes deconnecté',
                        });
                      }}
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <AiOutlineLogin />
                    Se connecter
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
