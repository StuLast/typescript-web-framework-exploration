import axios from 'axios';

const dbApi = axios.create('http://localhost:3000')

export default dbApi