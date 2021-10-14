import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number
  name?: string,
  age?: number
}

type Callback = () => void;

export class User {

  private events: { [key: string]: Callback[] } = {};

  /**
   * 
   * @param data 
   */
  constructor(private data: UserProps) {}

  /**
   * 
   * @param propName 
   * @returns 
   */
  get(propName: string): string | number {
    return this.data[propName];
  }

  /**
   * 
   * @param update 
   */
  set( update: UserProps): void {
   Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if(!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }

  fetch (): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((res: AxiosResponse): void => {
      this.set(res.data)
    });
  }

  save (): void {
    if(!this.data.id){
      axios.post('http://localhost:3000/users', 
        JSON.stringify(this.data)
      ).then((res: AxiosResponse) => {
        console.log(res);
      });
      return;
    }

    axios.put(`http://localhost:3000/users/${this.data.id}`, 
      JSON.stringify(this.data)
    ).then((res: AxiosResponse) => {
      console.log(res);
    })
    return;
  }
}


axios.get('http://localhost:3000/users/1');