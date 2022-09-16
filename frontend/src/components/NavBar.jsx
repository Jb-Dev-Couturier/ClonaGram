import React from 'react';
import { Link } from 'react-router-dom';
import { SiInstagram } from 'react-icons/si';

import { AiOutlineLogout, AiOutlineHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { MdOutlinePostAdd } from 'react-icons/md';
import {CgProfile } from 'react-icons/cg'
import defaulProfil from '../styles/assets/defaultProfile.png'

const NavBar = () => {
  return (
    <header className="Navbar">
      <nav>
        <div className="navContainer">
          <div className="logoContainer">
            <SiInstagram />
            <h3>ClonaGram</h3>
            <h5>
              Bienvenue : <img src={defaulProfil} alt="userPic" /> username
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
                <Link to="/profile/:username">
                  <CgProfile />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <AiOutlineLogout />
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
