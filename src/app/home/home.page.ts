import { Component, OnInit } from '@angular/core';
import { IArco } from '../share/interfaces';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})

export class HomePage implements OnInit {
  public arcos: IArco[];
  arcosinit: IArco[] = [
    {
      id: '1',
      name: 'Cto. España de Sala',
      place: 'Marina DOr',
      date: '2021',
      image: 'https://www.lovevalencia.com/wp-content/uploads/2015/08/Marina-dOr-Ciudad-de-Vacaciones.jpg',
      description: "Campeonato de España de Sala de tiro con Arco en las instalaciones de Marina D'Or, este será celebrado en dichas instalaciones a finales de Marzo"
    },
    {
      id: '2',
      name: '1 Gran Premio España',
      place: 'Valladolid',
      date: '2020',
      image:'https://fotos.hoteles.net/articulos/guia-ciudad-de-valladolid-5084-7.jpg',
      description: "Primer gran premio de España de tiro con arco celebrado en el mes de Marzo de 2020 en Valladolid"
    }
  ]
  constructor(private arcodbService: ArcodbserviceService, private route: Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter(){
    // Remove elements if it already has values
    if(this.arcos !== undefined ){
      this.arcos.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.arcodbService.empty()) {
      this.arcosinit.forEach(arco => {
        this.arcodbService.setItem(arco.id, arco);
      });
    }
  }
  retrieveValues(){
    // Retrieve values
    this.arcodbService.getAll().then(
      (data) => this.arcos = data
    );
  }
  arcoTapped(arco) {
    this.route.navigate(['details', arco.id]);
  }
}
