import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ArcodbserviceService } from '../core/arcodbservice.service';
import { ArcocrudService } from './../core/arcocrud.service';
import { IArco } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public arco:IArco;
  public arc : IArco;
  arcoForm: FormGroup;
  id: any;
  

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private arcodbService: ArcodbserviceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.arcodbService.getItem(this.id).then(
      (data: IArco)=>{
        this.arco = data
        this.arcoForm.get('name').setValue(this.arco.name);
        this.arcoForm.get('place').setValue(this.arco.place);
        this.arcoForm.get('date').setValue(this.arco.date);
        this.arcoForm.get('image').setValue(this.arco.image);
        this.arcoForm.get('description').setValue(this.arco.description);

      }
    );
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
    this.arc = this.arcoForm.value;
    let nextKey = this.arco.name.trim();
    this.arc.id = nextKey;
    this.arcodbService.setItem(nextKey, this.arc);
    console.warn(this.arcoForm.value);
  }

}
