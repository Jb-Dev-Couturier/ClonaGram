import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { height } from '@mui/system';

export default function AllPosts({ user }) {
  const [allPostsData, setAllPostsData] = useState(null);

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
    <div className="center mt-3">
      {allPostsData ? (
        allPostsData.map((post, index) => (
          <div
            className="center m-2"
            style={{ min_width: '30%', maxWidth: '500px' }}
            key={index}
          >
            <Card>
              <div className="d-flex align-items-center flex-column">
                <Card.Img
                  variant="top"
                  src={post.photo.asset.url}
                  className='imgPost'
                />
              </div>
              <Card.Body>
                <Link to={'/profile/' + post.username}>
                  <Card.Title>@{post.username}</Card.Title>
                </Link>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="footerCard">
                {post.created_at}
              </Card.Footer>
            </Card>
          </div>
        ))
      ) : (
        <p>Pas de post a afficher</p>
      )}
    </div>
  );
}
