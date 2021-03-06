import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})



export class AppComponent implements OnInit {
  results: string[];
  private _codigoLocalFavorito: string;
  private _temperaturaMaximaSemana: number;
  private _temperaturaMinimaSemana: number;
  private codigoBlumenau: string = '455846';
  private cidades: Array<any>;
  private estados: any;
  private diversao: any;
  private cidadeFavorita: any;
  private loading: boolean = true;
  private loadingCidade: boolean = true;
  private cidadesAutoComplete: Array<any>;
  private showCidadesAutoComplete: boolean = false;
  private buttonEnable: boolean = false;
  private cidadesCtrl: FormControl;
  private cidadesOptions: Array<String>;
  private filtercidades: Observable<any[]>;
  cidadeSelecionada: any;
  objCidadeSelecionada: {};
  private temperaturasMaximas: Array<number> =[];
  private temperaturasMinimas: Array<number> = [];
  private dias : Array<string> = [];
  private showChart: boolean = false;
  public barChartData:any[] = [];
  public barChartLabels:string[] = [];
  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  private checked: boolean = false;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.cidadesCtrl = new FormControl();

    this.carregaDados();
  }

  carregaDados(): void {
    this.cidades = this.apiService.getCidades();
    this.estados = this.apiService.getEstados();
    this.diversao = this.apiService.getDiversao();

    if (this.getCodigoLocalFavorito() != "0") {
      this.buscaCidadeFavorita(this._codigoLocalFavorito);
    }
    else {
      this.buscaCidadeFavorita(this.codigoBlumenau);
    }
    
  }

  setLocalFavorito() {
    localStorage.setItem("favorito", this.getCodigoCidade());
    this._codigoLocalFavorito = this.getCodigoCidade();
  }

  getCodigoLocalFavorito(): any {
    this._codigoLocalFavorito = localStorage.getItem("favorito") != null ? localStorage.getItem("favorito") : "0";
    return this._codigoLocalFavorito;
  }

  buscaCidadeFavorita(codigo: string): any {
    this.apiService.getDataWeather(codigo).subscribe(result => {
      this.cidadeFavorita = result;
      this.objCidadeSelecionada = result;
      this.loading = false;
      this.loadingCidade = false;
      this.loadChart();
    })

  }

  loadChart(): void {
    this.temperaturasMaximas = this.getTemperaturasMaximas();
    this.temperaturasMinimas = this.getTemperaturasMinimas();
    this.dias = this.getDias();
    
    this.barChartData = [
      {data: this.temperaturasMaximas, label: 'Temperaturas Maximas'},
      {data: this.temperaturasMinimas, label: 'Temperaturas Mínimas'}
    ];

    this.barChartLabels = this.dias;

    this.showChart = true;
  }

  onChangeEstados(estado: string): void {
    this.cidadeSelecionada = "";
    this.cidadesAutoComplete = this.cidades.
      filter(cidade => cidade['Estado'] == estado);
    this.showCidadesAutoComplete = true;
    

  }

  visualizaCidadeSelecionada(): void {
    this.loadingCidade = true;
    var codigoWoeid = this.getCodigoCidade();
    
    this.apiService.getDataWeather(codigoWoeid).subscribe(result => {
      this.objCidadeSelecionada = result;
      this.loadChart();
      this.loadingCidade = false;
    })
  }


  getCodigoCidade(): string {
    var codigo = this.cidades.filter(cidade => cidade['cidade'] == this.cidadeSelecionada).map(cidade => cidade['WOEID']);
    return codigo[0];
  }

  getTemperaturaMaxima() {
    var max = this.objCidadeSelecionada['forecast'].map(dia => dia['max']);
    return Math.max.apply(null, max);
  }

  getTemperaturaMinima() {
    var min = this.objCidadeSelecionada['forecast'].map(dia => dia['min']);
    return Math.min.apply(null, min);
  }

  getTemperaturasMaximas(): Array<number> {
    return  this.objCidadeSelecionada['forecast'].map(dia => Number(dia['max']));
  }

  getTemperaturasMinimas(): Array<number> {
    return  this.objCidadeSelecionada['forecast'].map(dia => Number(dia['min']));
  }

  getDias(): Array<string>{
    return this.objCidadeSelecionada['forecast'].map(dia => dia['weekday']);
  }

  eFinalSemana(dia) {
    if (dia.weekday == "Dom" || dia.weekday == "Sáb") {
      return true;
    }
    else {
      return false;
    }
  }

  buscaDiversao(dia) {
    var codigoCidade = this.getCodigoCidade();
    var diversao = "Diversão não cadastrada";
    /*
      var oqueFazer = this.diversao.filter(diversao=>  diversao["WOEID"] == codigoCidade);
      if(dia == "rain" || dia =="storm"){
        console.log('Ruim')
        console.log(oqueFazer['Ruim'])
        return oqueFazer['Ruim']
      } else {
        console.log('bom')
        console.log(oqueFazer['Bom'])
        return oqueFazer['Bom']
      }
      
      */

    return diversao;

  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
 
  // events chart
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 

}
