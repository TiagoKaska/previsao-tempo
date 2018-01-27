import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {HttpClient} from '@angular/common/http';
import * as data from './data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//https://api.hgbrasil.com/weather/?format=json&woeid=455846
export class AppComponent implements OnInit {
  results: string[];

  constructor(private http: HttpClient) {
    
  }
  
  ngOnInit(): void {

    const cidades = (<any>data).cidades;
    const estados = (<any>data).estados;
    const diversao = (<any>data).diversao;
    console.log(cidades);
    console.log(estados);
    console.log(diversao);

    //this.http.get('https://api.hgbrasil.com/weather/?format=json&woeid=455903').subscribe(data => {
      this.http.get('api/weather/?format=json&woeid=455903').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log(this.results)
    });
  }


  cidadeFavorita = 'Blumenau';
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
}
