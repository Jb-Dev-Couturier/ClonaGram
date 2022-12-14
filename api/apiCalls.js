import { createReadStream } from 'fs';
import sanityClient from './client.js';
import { basename } from 'path';
import { nanoid } from 'nanoid';

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
    `*[_type == "user" && username == $username]{
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
    { username: user }
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
      "posts": *[_type == "post" && references(^._id)]{
        ...,
        "username": author->username,
        "like":count(like),
        "likers":*[_type == "user" && references(^._id)],
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

functions.getPosts = (username) => {
  return sanityClient.fetch(
    `*[_type == "post" && author->username == $username]{
    ...,
    "username": author->username,
    "email": author->email,
    "profileImage": author->photo{
      asset->{
        _id,
        url
      }
    },
    "like":count(like),
    "likers":*[_type == "user" && references(^._id)],
    photo{
      asset->{
        _id,
        url
      }
    }
  }`,
    { username }
  );
};

functions.updateProfile = (
  user,
  first_name,
  last_name,
  username,
  email,
  bio,
  birthday,
  livesin,
  workat,
  image
) => {
  if (image) {
    return sanityClient.assets
      .upload('image', createReadStream(image.path), {
        filename: basename(image.path),
      })
      .then((data) =>
        functions.getUserId(user).then((ids) =>
          sanityClient
            .patch(ids[0]._id)
            .set({
              first_name,
              last_name,
              username,
              email,
              bio,
              birthday,
              livesin,
              workat,
              photo: { asset: { _ref: data._id } },
            })
            .commit()
        )
      );
  } else {
    return functions.getUserId(user).then((ids) =>
      sanityClient
        .patch(ids[0]._id)
        .set({
          first_name,
          last_name,
          username,
          email,
          bio,
          birthday,
          livesin,
          workat,
        })
        .commit()
    );
  }
};

functions.addFollower = (user, followingId) => {
  return functions.getUserId(user).then((ids) =>
    sanityClient
      .patch(ids[0]._id)
      .setIfMissing({ following: [] })
      .insert('after', 'following[-1]', [
        { _ref: followingId, _key: nanoid(), _type: 'reference' },
      ])
      .commit()
  );
};

functions.removeFollower = (user, followingId) => {
  return functions.getUserId(user).then((ids) =>
    sanityClient
      .patch(ids[0]._id)
      .unset([`following[_ref=="${followingId}"]`])
      .commit()
  );
};

export default functions;
