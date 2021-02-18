import { Component, OnInit } from '@angular/core';
import { IArco } from '../share/interfaces';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { ArcocrudService } from './../core/arcocrud.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls :['home.page.scss'],
})

export class HomePage implements OnInit {
  arcos: any;
  arcoName: string;
  arcoPlace: string;
  arcoDate: string;
  arcoImage: string;
  arcoDescription: string;

  constructor(private arcocrudService: ArcocrudService) { }
  
  ngOnInit() {
    this.arcocrudService.read_Arcos().subscribe(data => {
      this.arcos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          place: e.payload.doc.data()['place'],
          date: e.payload.doc.data()['date'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.arcos);
    });
  }

  CreateRecord() {
    let record = {};
    record['name'] = this.arcoName;
    record['place'] = this.arcoPlace;
    record['date'] = this.arcoDate;
    record['image'] = this.arcoImage;
    record['descrition'] = this.arcoDescription;

    this.arcocrudService.create_Arco(record).then(resp => {
      this.arcoName = "";
      this.arcoPlace = "";
      this.arcoDate = "";
      this.arcoImage = "";
      this.arcoDescription = "";
      this.arcoDate = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.arcocrudService.delete_Arco(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditPlace = record.Place;
    record.EditDate = record.Date;
    record.EditImage = record.Image;
    record.EditDescription = record.Description;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['place'] = recordRow.EditPlace;
    record['date'] = recordRow.EditDate;
    record['image'] = recordRow.EditImage;
    record['descrition'] = recordRow.EditDescription;
    this.arcocrudService.update_Arco(recordRow.id, record);
    recordRow.isEdit = false;
  }

  /*public arcos: IArco[];*/
  /*arcosinit: IArco[] = [
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
  ]*//*
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
  }*/
}
