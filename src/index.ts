import { User } from './models/User';

const user = new User({ id: 1});
console.log('gonna fetch a user with id of 1');

user.on('change', () => {
  console.log(user);
});

user.fetch();



