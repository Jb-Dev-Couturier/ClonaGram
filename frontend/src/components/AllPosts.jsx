import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from '../styles/assets/bookmark.png';
import Comment from '../styles/assets/bookmark.png';
import Dot from '../styles/assets/dot.png';
import HeartFull from '../styles/assets/heart_red.png';
import HeartEmpty from '../styles/assets/heart.png';
import Share from '../styles/assets/share.png';
import Profil from '../styles/assets/defaultProfile.png';

export default function AllPosts({ user }) {
  const [allPostsData, setAllPostsData] = useState(null);
  const [like, setLike] = useState(false);

  const setLikedHeart = () => {
    setLike((prev) => !prev);
    console.log(allPostsData);
  };

  useEffect(() => {
    if (!user) {
      fetch('/getAllPosts')
        .then((res) => res.json())
        .then((data) => setAllPostsData(data))
        .catch((err) => console.log(err.message));
    } else {
      fetch('/getPostsOfFollowing?user=' + user)
        .then((res) => res.json())
        .then((data) => setAllPostsData(data))
        .catch((err) => console.log(err.message));
    }
  }, [user]);
  return (
    <div className="center mt-3 allPost">
      {allPostsData ? (
        allPostsData.map((post, index) => (
          <div className="card" key={index}>
            <div className="top">
              <div className="userDetails">
                <div className="profile_img">
                  <img
                    src={
                      post.profileImage ? post.profileImage.asset.url : Profil
                    }
                    alt="userpic"
                    className="cover"
                  />
                </div>
                <Link to={'/profile/' + post.username} style={{textDecoration:'none'}}>
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
              <img src={post.photo.asset.url} alt="postPic" className="cover" />
            </div>
            <div className="actionBtns">
              <div className="left">
                <img
                  src={like ? HeartFull : HeartEmpty}
                  alt="like-button"
                  className="Heart"
                  onClick={setLikedHeart}
                />
                <img src={Comment} alt="commentIcon" />
                <img src={Share} alt="shareIcon" />
              </div>
              <div className="right">
                <img src={Bookmark} alt="bookmarkIcon" />
              </div>
            </div>
            <h4 className="likes">
              {post.likers ? post.likers.length : '0'} Likes
            </h4>
            <h4 className="message" style={{ textTransform: 'capitalize' }}>
              <b>{post.username}:</b>
              <br />
              {post.description}
            </h4>
            <h4 className="comments">Voir Commentaires 256</h4>
            <div className="addComments">
              <div className="userImg">
                <img src={Profil} alt="user-pic" className="cover" />
              </div>
              <input
                type="text"
                className="text"
                placeholder="ajoutez commentaires"
              ></input>
            </div>
            <h5 className="postTime">{post.created_at}</h5>
          </div>
        ))
      ) : (
        <p>Pas de post a afficher</p>
      )}
    </div>
  );
}
