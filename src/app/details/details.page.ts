import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { IArco } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { ArcocrudService } from './../core/arcocrud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public arco: IArco;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private arcocrudService: ArcocrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.arcocrudService.read_Arcos().subscribe(data => {
      let arcos = data.map(e => {
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
      console.log(arcos);

      arcos.forEach(element => {
        if (element.id == this.id) {
          this.arco = element;
        }
      });
    });
  }

  EditRecord(arco) {
    this.router.navigate(['edit', arco.id]);
  }

  RemoveRecord(rowID) {
    this.arcocrudService.delete_Arco(rowID);
  }

}
