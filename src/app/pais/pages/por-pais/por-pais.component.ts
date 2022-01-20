import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent  {

  termino: string ='';
  hayError: boolean = false;
  paises: Country[]=[];
  paisesSugeridos: Country[]=[];
  mostrarSugerencias: boolean=false;

  constructor(private paisService: PaisService){}

  buscar(termino: string){
    console.log(this.termino);
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarPais(this.termino)
    .subscribe({
      next: (paises) => {
        console.log(paises);
        this.paises = paises;

      },
      error: (err) => {
        this.hayError = true;
        this.paises=[];
      }
    });

  }
  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    // this.paisService.buscarPais(termino)
    //   .subscribe(
    //     paises => this.paisesSugeridos = paises.splice(0,5),
    //     (err) => this.paisesSugeridos = []
    //   )
    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => {this.paisesSugeridos = paises.splice(0,5)},
        error: (e) => this.paisesSugeridos = []
       
        }
      )
      
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
    this.mostrarSugerencias= false;
  }

}
