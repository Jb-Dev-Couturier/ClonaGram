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

export default functions
