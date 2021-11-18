import axios,  { AxiosPromise } from 'axios';

interface IhasId {
  id?: number | undefined;
}

export class ApiSync<T extends IhasId> {
  constructor(
    public rootUrl: string
    
  ) {console.log(rootUrl);}

  fetch (id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  save (data: T): AxiosPromise {
    const { id } = data;

    if(!id){
      return axios.post(this.rootUrl, data)
    }

    return axios.put(`${this.rootUrl}/${id}`, data);
  }
}