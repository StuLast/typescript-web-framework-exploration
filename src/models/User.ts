import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

export interface IuserProps {
  id?: number | undefined
  name?: string,
  age?: number
}

const rootUrl = "http://localhost:3000/users"

export class User extends Model<IuserProps>{
  static buildUser (attr: IuserProps): User {
    return new User(
      new Attributes<IuserProps>(attr),
      new Eventing(),
      new ApiSync<IuserProps>(rootUrl)
    )
  }

  static buildUserCollection(): Collection<User, IuserProps> {
    return new Collection<User, IuserProps>(
      rootUrl,
      (json: IuserProps) => User.buildUser(json)
      );
  }

  public setRandomAge = (): void => {
    const age = Math.ceil(Math.random() * 100);
    this.set({age});
  }

}


