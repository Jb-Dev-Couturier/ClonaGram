import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import EditProfile from './EditProfile';
import { Link } from 'react-router-dom';

import Bookmark from '../styles/assets/bookmark.png';
import Comment from '../styles/assets/bookmark.png';
import Dot from '../styles/assets/dot.png';
import HeartFull from '../styles/assets/heart_red.png';
import HeartEmpty from '../styles/assets/heart.png';
import Share from '../styles/assets/share.png';
import defaulProfil from '../styles/assets/defaultProfile.png';
import defaulCover from '../styles/assets/coverDefault.jpg';

export default function Profile({ user, setAlert }) {
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState({});
  const [following, setFollowing] = useState(false);
  const [owner, setOwner] = useState(false);
  const [editing, setEditing] = useState(false);
  const params = useParams();

    useEffect(() => {
      updateProfile(params.username);
    }, [params.username, user]);

  function updateFollowing(profile) {
    for (let follower of profile.followers) {
      if (follower.username === user) {
        setFollowing(true);
        return;
      }
    }
    setFollowing(false);
  }


  function updateProfile(username) {
    fetch('/getProfile?user=' + username)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setAlert({
            variant: 'danger',
            message: `Ce profil n'existe pas.`,
          });
          return;
        }
        fetch('/getPosts?user=' + username)
          .then((res) => res.json())
          .then((posts) => {
            setProfileData(data[0]);
            setPosts(posts);
            updateFollowing(data[0]);
            setOwner(user === data[0].username);
          });
      })
      .catch((err) => console.error(err));
  }

  function followClick() {}

  function hideEditCallback() {}

  if (profileData === {}) return null;

  return (
    <div className="profile">
      {/* Data utilisateurs */}
      <div className="profileData">
        <h3>Profil de @{profileData.username}</h3>
        <div className="imgcontainer">
          <img
            src={profileData.photo ? profileData.photo.asset.url : defaulProfil}
            alt="user-pic"
            id="profil-img"
          />
          <img
            src={
              profileData.photocover
                ? profileData.photocover.asset.url
                : defaulCover
            }
            alt="cover-pic"
            id="cover-img"
          />
        </div>
        <div className="verticalDataContainer">
          <div className="vertical-data">
            <p>
              <strong>Post</strong>
            </p>
            <h4>{posts ? posts.length : '0'}</h4>
          </div>
          <div className="vertical-data">
            <p>
              <strong>Abonné(es)</strong>
            </p>
            <h4>
              {profileData.followers ? profileData.followers.length : '0'}
            </h4>
          </div>
          <div className="vertical-data">
            <p>
              <strong>Abonnement(s)</strong>
            </p>
            <h4>{profileData.following ? profileData.following : '0'}</h4>
          </div>
          <div className="follow-button">
            {user && !owner ? (
              <Button
                variant={following ? 'danger' : 'warning'}
                onClick={followClick}
              >
                {following ? 'Désabonner' : `S'abonné`}
              </Button>
            ) : null}
            {user && owner ? (
              <Button variant="primary" onClick={() => setEditing(true)}>
                Editer
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bio utilisateurs */}
      <div className="profileBio">
        <div className="profile-name">
          <strong>Nom/Prenom : </strong>
          {(profileData.first_name ? profileData.first_name : '') +
            '' +
            (profileData.last_name ? profileData.last_name : '')}
        </div>
        <div className="profileInfo">
          <strong>Email : </strong>
          {profileData.email ? profileData.email : ''}
        </div>
        <div className="profile-text">{profileData.bio}</div>
        <div className="profileDetail">
          <div className="birthday">
            <strong>Anniverssaire : </strong>
            <span>{profileData.birthday}</span>
          </div>
          <div className="livesin">
            <strong>Domicile : </strong>
            <span>{profileData.livesin}</span>
          </div>
          <div className="workat">
            <strong>Travail : </strong>
            <span>{profileData.workat}</span>
          </div>
        </div>
      </div>
      {/* afficher les post utilisateurs */}
      <div className="profile-posts-wrapper">
        <div className="profile-posts">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <div className="card" key={index}>
                <div className="top">
                  <div className="userDetails">
                    <div className="profile_img">
                      <img
                        src={
                          post.profileImage
                            ? post.profileImage.asset.url
                            : defaulProfil
                        }
                        alt="userpic"
                        className="cover"
                      />
                    </div>
                    <Link
                      to={'/profile/' + post.username}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3 style={{ textTransform: 'capitalize' }}>
                        {post.username}
                        <br />
                        <span style={{ textTransform: 'initial' }}>
                          {post.email}
                        </span>
                      </h3>
                    </Link>
                  </div>
                  <div className="">
                    <img src={Dot} alt="dotpic" className="dot" />
                  </div>
                </div>
                <div className="imgBx">
                  <img
                    src={post.photo.asset.url}
                    alt="postPic"
                    className="cover"
                  />
                </div>
                <div className="actionBtns">
                  <div className="left">
                    <img
                      src={post.like ? HeartFull : HeartEmpty}
                      alt="like-button"
                      className="Heart"
                      
                    />
                    <img src={Comment} alt="commentIcon" />
                    <img src={Share} alt="shareIcon" />
                  </div>
                  <div className="right">
                    <img src={Bookmark} alt="bookmarkIcon" />
                  </div>
                </div>
                <h4 className="likes">{post.like ? post.like : '0'} Likes</h4>
                <h4 className="message" style={{ textTransform: 'capitalize' }}>
                  <b>{post.username}:</b>
                  <br />
                  {post.description}
                </h4>
                <h5 className="postTime">{post.created_at}</h5>
              </div>
            ))
          ) : (
            <p>Pas de post a afficher</p>
          )}
        </div>
      </div>
    </div>
  );
}
