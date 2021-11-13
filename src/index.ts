import { User } from './models/User';

const user = new User({id: 1});
user.fetch()

const candy = new User({name: 'Candy', age: 27});
candy.save();

setTimeout(() => {
  console.log(candy)
}, 4000)