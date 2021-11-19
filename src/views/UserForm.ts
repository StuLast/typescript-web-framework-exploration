import {User} from '../models/User'

export class UserForm {

  constructor (
    public parent: Element,
    public model: User
  ) {
    this.bindModel();
  }

  bindModel = (): void => {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap (): {[key: string]: () => void} {
    return {
      'click:#set_age': this.onSetAgeClick,
      'click:#set_name': this.onSetNameClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    
    if(!input) {
      return;
    }

    const name = input.value;
    this.model.set({name});
  }

  template = (): string => {
    return (`
      <div>
        <h1> User form </h1>
        <div>${this.model.get('name')}</div>
        <div>${this.model.get('age')}</div>
        <input value/>
        <button id="set_name"> Change Name </button>
        <button id="set_age"> Set Random Age </button>
      </div>
    `);
  }

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();

    for(let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render = () => {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}