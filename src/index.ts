import { User } from './models/User';

const user = new User({
  id: 2
});

user.on('change', () => { console.log('Change event 1') });
user.on('change', () => { console.log('Change event 2') });
user.on('click', () => { console.log('Click event 3')} );

user.trigger('change');
user.trigger('click');

user.fetch();
console.log(user);
user.set({
  age: 55
});
user.save();
console.log(user)

