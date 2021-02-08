import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { IArco } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

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
    private arcodbService: ArcodbserviceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.arcodbService.getItem(this.id).then(
      (data:IArco)=> this.arco = data
    );
  }

  editRecord(arco){
    this.router.navigate(['edit',arco.id])
  }

  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar competicion',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.arcodbService.remove(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
