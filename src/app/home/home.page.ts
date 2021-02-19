import { Component, OnInit } from '@angular/core';
import { IArco } from '../share/interfaces';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
import { ArcocrudService } from './../core/arcocrud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  
})

export class HomePage implements OnInit {

  arcos: any;
  arcoName: string;
  arcoImage: string;

  constructor(private arcocrudService: ArcocrudService, private route: Router) { }

  ngOnInit(): void {
    this.arcocrudService.read_Arcos().subscribe(data => {
      this.arcos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          place: e.payload.doc.data()['place'],
          date: e.payload.doc.data()['date'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description'],

        };
      })
      console.log(this.arcos);
    });
  }
  
  arcoTapped(arco) {
    this.route.navigate(['details', arco.id]);
  }
}
