import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url:string;
  
    constructor(url:string){
      this.url=`http://localhost:42585/chamboCRUD/api${url}`;
    }
}
