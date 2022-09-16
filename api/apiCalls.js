import sanityClient from './client.js';

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

functions.getProfile =(user)=>{
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
    {email:user}
  );
}

export default functions
