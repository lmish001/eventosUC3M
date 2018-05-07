import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map, filter, tap, take } from 'rxjs/operators';
import firebase from '@firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Categories } from '../../globalTypes';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { MisEventosPage } from '../mis-eventos/mis-eventos';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  previewURL: Observable<any>;
  file: Blob;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadPercent: Observable<number>;
  uploadURL: Observable<string>;
  uploadState: Observable<string>;
  user: User;
  eventForm: FormGroup;
  minDate: String;
  maxDate: String; 
  newEvent: Event = null;
  categMarcadas: Categories[] = [];
  changedCat: boolean = false;
  typeLeave: string = 'back';
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro'];


  constructor(public navCtrl: NavController, public navParams: NavParams, private afStorage: AngularFireStorage, public formB: FormBuilder, private eventService: EventService, public toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.minDate = new Date().toISOString();
    this.eventForm = formB.group ({
      nombreEvento: ['', Validators.compose([Validators.required, Validators.maxLength(80)])],
      descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      foto: ['', Validators.required],
      fecha: ['', Validators.required],
      organizador: ['', Validators.required],
      contacto: ['',  Validators.compose([Validators.required, Validators.email])],
      paginaWeb: ['', Validators.required],
      campus: ['', Validators.required],
      aula: ['', Validators.required],
      creditos: [0, Validators.required],
      categoriasEvento: [0, Validators.pattern('1')],
    
    });
  }

  formChanged() {
    if (this.eventForm.dirty || this.changedCat==true) return true;
    return false;
  }


  async ionViewCanLeave() {

    if (this.typeLeave=='back'&&this.formChanged()) {
       const shouldLeave = await this.confirmLeave();
    return shouldLeave;
    }
    return true;

  }

  confirmLeave(): Promise<Boolean> {
    this.typeLeave='back';
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    const alert = this.alertCtrl.create({
      title: 'Descartar cambios',
      message: '¿Está seguro que quiere dejar la página sin guardar cambios?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveLeaving(false)
        },
        {
          text: 'Si',
          handler: () => resolveLeaving(true)
        }
      ]
    });
    alert.present();
    return canLeave
  }

  onChange(category:  Categories) {
    if (this.categMarcadas.length==0 || this.categMarcadas.indexOf (category)==-1) {
      this.categMarcadas.push(category);
      this.eventForm.controls['categoriasEvento'].setValue('1');
    }
    else {
      this.categMarcadas.splice (this.categMarcadas.indexOf(category), 1);
      if (this.categMarcadas.length==0)  this.eventForm.controls['categoriasEvento'].setValue('0');
    }
    this.changedCat=true;
     
}

  ngOnInit() {
    this.user = this.navParams.get('param1');
  }

  previewFile(event) {

    const file = event.target.files[0];
    if(!file) { return; }
    this.clearUpload();
    const reader = new FileReader();
    this.file = file;
    this.previewURL = fromEvent(reader, 'load').pipe(map((e: any) => e.target.result))
    reader.readAsDataURL(this.file);
  }

  
  uploadFile() {

    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`images/${randomId}`);
    this.task = this.ref.put(this.file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadPercent = this.task.percentageChanges();
    this.uploadURL = this.task.downloadURL();
  }

  
  cancelUpload() {
    this.task.cancel();
    this.clearUpload();
  }

  
  deleteUpload() {
    this.ref.delete()
      .pipe(
        tap(() => this.clearUpload()),
        take(1)
      ).subscribe();

      this.eventForm.controls['foto'].reset;

  }

  clearUpload() {

    this.previewURL = of(null);
    this.uploadPercent = of(0);
    this.uploadURL = of(null);
    this.file = null;
    this.uploadState = undefined;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  async createEvent(){
  this.typeLeave='create';
  const shouldCreate = await this.confirmCreate();
  if (shouldCreate) {
    let data = this.eventForm.value;
    this.newEvent = {
      name: data.nombreEvento,
      photo: data.foto,
      date: data.fecha,
      campus: data.campus,
      classroom: data.aula,
      credits: data.creditos,
      organizer: data.organizador,
      contact: data.contacto,
      description: data.descripcion,
      categories: this.categMarcadas,
      inscriptions: 0,
      webpage: data.paginaWeb,
      users_registered: ['0'],
      users_favorites: ['0'],
      publicado_por: this.user.email
    };
  
    this.eventService.addEvent (this.newEvent);
    this.presentToast();
    this.navCtrl.pop();
  }

  }

  confirmCreate(): Promise<Boolean> {
    let resolveCreate;
    const canCreate = new Promise<Boolean>(resolve =>resolveCreate = resolve);
    const alert = this.alertCtrl.create({
      title: 'Publicar evento',
      message:'¿Está seguro que quiere publicar el evento?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveCreate(false)
        },
        {
          text: 'Si, quiero publicar el evento',
          handler: () =>resolveCreate(true)
        }
      ]
    });
    alert.present();
    return canCreate
  }

  setImage (value: any) {
    this.eventForm.controls['foto'].setValue(value);
  }

  minStartDate() {
    return new Date().toLocaleString;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Evento publicado',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }


}
