import { User } from './models/User';
import axios, { AxiosResponse } from 'axios'

axios.get('http://localhost:3000/users')
.then((response: AxiosResponse) =>{
  console.log("DATA: ", response.data);
})
.catch((err) => {
  console.log("ERROR:", err)
})



