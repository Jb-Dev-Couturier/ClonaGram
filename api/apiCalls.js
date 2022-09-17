import { createReadStream } from 'fs';
import sanityClient from './client.js';
import { basename } from 'path';

const functions = {};

functions.createUser = (username, firstname, lastname, email, password) => {
  return sanityClient.create({
    _type: 'user',
    first_name: firstname,
    last_name: lastname,
    username: username,
    email: email,
    password: password,
    created_at: new Date(),
  });
};

functions.getProfile = (user) => {
  return sanityClient.fetch(
    `*[_type == "user" && email == $email]{
    ...,
    "following":count(following),
    "followers":*[_type == "user" && references(^._id)],
    photo{
      asset->{
        _id,
        url,
      },
    },
    photocover{
      asset->{
        _id,
        url,
      },
    },
  }`,
    { email: user }
  );
};

functions.getUserId = (user) => {
  return sanityClient.fetch(
    `*[_type == "user" && username == $username]{
      _id
    }`,
    { username: user }
  );
};

functions.createPost = async (user, caption, image) => {
  const data = await sanityClient.assets.upload(
    'image',
    createReadStream(image.path),
    {
      filename: basename(image.path),
    }
  );
  const ids = await functions.getUserId(user);
  const id = ids[0]._id;
  return await sanityClient.create({
    _type: 'post',
    author: { _ref: id },
    photo: { asset: { _ref: data._id } },
    description: caption,
    created_at: new Date(),
  });
};

functions.getAllPosts = () => {
  return sanityClient.fetch(`*[_type == "post"]{
    ...,
    "like":count(like),
    "likers":*[_type == "user" && references(^._id)],
    "username": author->username,
    "email": author->email,
    "profileImage": author->photo{
      asset->{
        _id,
        url
      }
    },
    photo{
      asset->{
        _id,
        url
      }
    }
  }`);
};

functions.getPostsOfFollowing = (username) => {
  return sanityClient.fetch(
    `*[_type == "user" && username == $username]{
    following[]->{
      "posts": [_type == "post" && references(^._id)]{
        ...,
        "like":count(like),
        "likers":*[_type == "user" && references(^._id)],
        "username": author->username,
        "email": author->email,
        "profileImage": author->photo{
      asset->{
        _id,
        url
      }
    },
        photo{
          asset->{
            _id,
            url
          }
      }
    }
  }`,
    { username }
  );
};

functions.searchForUsername = (text) => {
  return sanityClient.fetch(
    `*[_type == "user" && username match "${text}*"]{
  ...,
  "followers": count(*[_type == "user" && references(^._id)]),
  photo{
    asset->{
      _id,
      url
    }
  }
}`
  );
};

export default functions;
