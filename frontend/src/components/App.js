import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPosts from './AllPosts';
import AlertDismissible from './AlertDismissible';
import CreatePost from './CreatePost';
import Login from './Login';
import Profile from './Profile';
import Search from './Search';
import SignUp from './SignUp';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route element={<AllPosts />} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<Profile />} path="/profile/:username" />
          <Route element={<Search />} path="/search" />
          <Route element={<CreatePost />} path="/create-post" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
