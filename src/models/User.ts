import { AxiosResponse } from 'axios';
import { Sync } from './Sync';
import { Eventing} from './Eventing'
import { Attributes } from './Attributes';



export interface IuserProps {
  id?: number | undefined
  name?: string,
  age?: number
}

const rootUrl = "http://localhost:3000/users"

export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<IuserProps> = new Sync<IuserProps>(rootUrl);
  private attributes : Attributes<IuserProps> 

  constructor(
    attrs: IuserProps
  ){
    this.attributes = new Attributes<IuserProps>(attrs);
  }

  get on () {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set = (update: IuserProps): void => {
    this.attributes.set(update);
    this.trigger('change');
  }

  fetch = (): void =>  {
    const id = this.get('id');
    if(typeof id !== 'number') {
      throw new Error('Cannot fetch without and ID')
    }

    this.sync.fetch(id)
      .then((response: AxiosResponse): void => {
        console.log(response);
        this.set(response.data);
      })
      .catch((err: Error): void => {

      })

  }

  save = () =>  {
  }
}
