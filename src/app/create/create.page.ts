import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IArco } from '../share/interfaces';
import { ArcocrudService } from '../core/arcocrud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  arco:IArco;
  arcoForm: FormGroup;

  constructor(
    private router: Router,
    private arcocrudService: ArcocrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.arcoForm = new FormGroup({
      name: new FormControl(''),
      place: new FormControl(''),
      date: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar competicion',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveArco();
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

  saveArco() {
    this.arco = this.arcoForm.value;
    let nextKey = this.arco.name.trim();
    this.arco.id = nextKey;
    this.arcocrudService.create_Arco(this.arco );
    console.warn(this.arcoForm.value);
  }

}
