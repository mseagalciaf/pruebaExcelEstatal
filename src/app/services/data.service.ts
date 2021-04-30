import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataExcel:any;

  constructor() { }

  saveData(data:any): boolean{
    this.dataExcel = data;
    return true;
  }

  getData(){
    return this.dataExcel;
  }

}
