import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as data from './data.json';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  data : any;

  
  constructor(private http: HttpClient) { 
    console.log('run service...')
  }

  getCidades() : any {
    return (<any>data).cidades;
  }

  getEstados(): any {
    return (<any>data).estados;
  }

  getDiversao(): any {
    return (<any>data).diversao;
  }

  getDataWeather( WOEID : string): Observable<any> {
    let response = this.http.get('api/weather/?format=json&woeid='+ WOEID)
    .map( res => res['results']);
    return response;
  }




}
