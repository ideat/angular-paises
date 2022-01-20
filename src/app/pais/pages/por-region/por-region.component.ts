import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [ 
    `
    button{
      margin-right: 5px;
      margin-bottom:5px;
    }
    `
  ]
})
export class PorRegionComponent  {

 // regiones:string[]=['EU', 'EFTA', 'CARICOM', 'PA', 'AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regiones: string[]=['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string ='';
  hayError: boolean= false;
  paises  : Country[] = [];
  termino : string= '';

  constructor(private paisService: PaisService) { }

  getClaseCSS( region: string){
    return region===this.regionActiva ? 'btn btn-primary':'btn btn-outline-primary'
  }

  activarRegion( region: string){
    if(region === this.regionActiva) {return;}
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region)
      .subscribe({
        next: (paises) => {
          this.paises = paises;
        }
      });
  }

  // buscar(termino: string){
  //   this.termino = termino;
  //   this.hayError = false;

  //   this.paisService.buscarRegion(this.termino)
  //     .subscribe({
  //       next: (paises) => {
  //         this.paises = paises;
  //       },
  //       error: (err) => {
  //         this.hayError=true;
  //         this.paises=[];
  //       }
  //     })
  // }

}
