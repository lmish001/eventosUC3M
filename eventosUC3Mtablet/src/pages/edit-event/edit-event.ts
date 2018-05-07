import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { map, tap, take } from 'rxjs/operators';
import 'firebase/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Categories } from '../../globalTypes';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ToastController } from 'ionic-angular';
import { Notification } from '../../models/notification.model';
import { HomePage } from '../home/home';


/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  prevPage: String;
  previewURL: Observable<any>;
  file: Blob;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadPercent: Observable<number>;
  uploadURL: Observable<string>;
  uploadState: Observable<string>;
  user: User;
  eventForm: FormGroup;
  eventPhoto: String;
  minDate: String;
  maxDate: String; 
  event: Event;
  changedCat: boolean = false;
  curDate:Date = new Date();
  notification: Notification;
  typeLeave: string = 'back';
  categMarcadas: Categories[] = [];
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro'];
  notifications$:  Observable<any>;
  notificationArray: Notification[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStorage: AngularFireStorage, public formB: FormBuilder, private eventService: EventService, public toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.minDate = new Date().toISOString();
    this.event = this.navParams.get('param1');
    this.user = this.navParams.get('param2');
    this.prevPage = this.navParams.get('param3');
    this.eventPhoto = this.event.photo;
    this.eventForm = formB.group ({
      nombreEvento: [this.event.name, Validators.compose([Validators.required, Validators.maxLength(80)])],
      descripcion: [this.event.description, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      fecha: [this.event.date, Validators.required],
      organizador: [this.event.organizer, Validators.required],
      contacto: [this.event.contact,  Validators.compose([Validators.required, Validators.email])],
      paginaWeb: [this.event.webpage, Validators.required],
      campus: [this.event.campus, Validators.required],
      aula: [this.event.classroom, Validators.required],
      creditos: [this.event.credits, Validators.required],
      categoriasEvento: [1, Validators.pattern('1')],
    
    });
  }

  ngOnInit() {
    this.getNotifications();
  }

  formChanged() {
    if (this.eventForm.dirty || this.changedCat==true) return true;
  }

  

  /*ionViewCanLeave(): boolean{
    return this.createLeaveViewAlert();
  }*/

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
    if (this.event.categories.length==0 || this.event.categories.indexOf (category)==-1) {
      this.event.categories.push(category);
      this.eventForm.controls['categoriasEvento'].setValue('1');
    }
    else {
      this.event.categories.splice (this.event.categories.indexOf(category), 1);
      if (this.event.categories.length==0)  this.eventForm.controls['categoriasEvento'].setValue('0');
    }
    this.changedCat=true;
     
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


  async updateEvent(){
  this.typeLeave='update';
  const shouldUpdate = await this.confirmUpdate();

  if (shouldUpdate) {
  let data = this.eventForm.value;
  
  this.event.name = data.nombreEvento;
  this.event.date = data.fecha;
  this.event.campus = data.campus;
  this.event.classroom = data.aula;
  this.event.credits = data.creditos;
  this.event.organizer = data.organizador;
  this.event.contact = data.contacto;
  this.event.description = data.descripcion;
  this.event.webpage = data.paginaWeb;

  this.notification = {
    eventKey: this.event.key, 
    publicado_por: this.user.email,
    eventName: this.event.name,
    eventPhoto: this.event.photo,
    eventDate: this.event.date,
    eventPlace: this.event.campus,
    eventCredits: this.event.credits,
    eventRegistered: this.event.inscriptions,
    type: 'modificado',
    date: this.curDate.toString()
  }

  this.eventService.addNotification(this.notification);
  this.eventService.updateEvent(this.event);
  this.presentToast();
  this.navCtrl.pop();
  }

 /* else {
    this.navCtrl.pop();
  }*/




  }

 async deleteEvent() {
  this.typeLeave='delete';
  const shouldDelete = await this.confirmDelete();
  if (shouldDelete) {
    this.notification = {
      eventKey: this.event.key,
      publicado_por: this.user.email,
      eventName: this.event.name,
      eventPhoto: this.event.photo,
      eventDate: this.event.date,
      eventPlace: this.event.campus,
      eventCredits: this.event.credits,
      eventRegistered: this.event.inscriptions,
      type: 'cancelado',
      date: this.curDate.toString()
    }

    this.deleteNotifications();
    this.eventService.deleteEvent(this.event);
    this.eventService.addNotification(this.notification);
    this.presentToastDelete();
    
    if (this.prevPage=='evDetail') {
      this.navCtrl.setRoot(HomePage);
    }
    else {
      this.navCtrl.pop();
    }
   
  }

  }

  getNotifications() {
    this.notifications$ = this.eventService.getNotifications().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(  
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.notifications$.forEach(value=>this.getNotificationsArray(value));
  }

  getNotificationsArray (value: any) {
    this.notificationArray = [];
    for (let v of value) {
      this.notificationArray.push(v);
    }
  }

  deleteNotifications () {
    for (let v of this.notificationArray) {
      if (this.event.key == v.eventKey) this.eventService.deleteNotification(v);
    }
  }

  confirmDelete(): Promise<Boolean> {
    let resolveDeleting;
    const canDelete = new Promise<Boolean>(resolve => resolveDeleting = resolve);
    const alert = this.alertCtrl.create({
      title: 'Cancelar evento',
      message:'¿Está seguro que quiere cancelar el evento? No podrá deshacer esta acción',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveDeleting(false)
        },
        {
          text: 'Si, quiero cancelar el evento',
          handler: () => resolveDeleting(true)
        }
      ]
    });
    alert.present();
    return canDelete
  }


  confirmUpdate(): Promise<Boolean> {
    this.typeLeave='update';
    let resolveUpdating;
    const canUpdate = new Promise<Boolean>(resolve => resolveUpdating = resolve);
    const alert = this.alertCtrl.create({
      title: 'Cancelar evento',
      message:'¿Está seguro que quiere modificar el evento?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveUpdating(false)
        },
        {
          text: 'Si, quiero modificar el evento',
          handler: () => resolveUpdating(true)
        }
      ]
    });
    alert.present();
    return canUpdate
  }



  

  minStartDate() {
    return new Date().toLocaleString;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Evento actualizado',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  presentToastDelete() {
    let toast = this.toastCtrl.create({
      message: 'Evento cancelado',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventPage');
  }

  categorySelected (category: Categories) {
    if (this.event.categories.indexOf(category)!=-1) return true;
    return false;
  }

  isChecked (value: number) {
    if (this.event.credits==value) return true;
    return false;
  }

}
