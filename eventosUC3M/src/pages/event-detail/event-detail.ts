import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import { User } from '../../models/user.model';
import { ToastController } from 'ionic-angular';
declare var google: any;
/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: Event;
  user: User;
  //isRegistered: boolean;
  //isFavorite: boolean;
  @ViewChild('map') mapElement: ElementRef;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService, public toastCtrl: ToastController) {
  }
  
  ngOnInit() {
    this.event = this.navParams.get('param1');
    this.user = this.navParams.get('param2');
    //this.isRegistered = this.eventService.isRegistered(this.event);
    //this.isFavorite = this.eventService.isInFavorites(this.event);
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  getDate(value: string): Date {
    return new Date (value);
  }

  loadMap(){
    let latLng = new google.maps.LatLng(0,0);
    if(this.event.campus==="Getafe"){
      latLng = new google.maps.LatLng(40.316966,-3.7292682);
    }
    else if(this.event.campus==="Leganés"){
      latLng = new google.maps.LatLng(40.3323904,-3.7677623);
    }
    else if(this.event.campus===("Colmenarejo")){
      latLng = new google.maps.LatLng(40.5430761,-4.012964);
    }
    else if(this.event.campus.includes("Puerta de toledo")){
      latLng = new google.maps.LatLng(40.4070472,-3.7111268);
    }
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      name: this.event.campus,
    }
 
    const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(map);
  }
  addMarker(map){
    new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
  }

  register(){
    if(this.event.users_registered[0]=='0'){
      this.event.inscriptions+=1;
      this.event.users_registered=[this.user.email];
      this.presentToastReg();
      this.eventService.updateEvent(this.event);
    }
    else if(this.event.users_registered.indexOf(this.user.email)==-1){
      this.event.inscriptions+=1;
      this.event.users_registered.push(this.user.email);
      this.presentToastReg();
      this.eventService.updateEvent(this.event);
    }
  }

  cancelRegistration(){
    this.event.users_registered.splice(this.event.users_favorites.indexOf(this.user.email), 1)
    if(this.event.users_registered.length==0) {
      this.event.users_registered=['0'];
    } 
    this.event.inscriptions -=1
    this.presentToastCancReg();
    this.eventService.updateEvent(this.event);
  /*  this.eventService.removeInscriptions(this.event);
    this.event.inscriptions-=1;
    this.isRegistered=false;*/
  }

  isRegistered(){
    if(this.event.users_registered[0]=='0' || this.event.users_registered.indexOf(this.user.email)==-1) return false;
    return true;
  }

  isFavorite(){
    if(this.event.users_favorites[0]=='0' || this.event.users_favorites.indexOf(this.user.email)==-1) return false;
    return true;
  }

  addFavorites() {
    if (this.event.users_favorites[0]=='0'){
      this.event.users_favorites = [this.user.email];
    }
    else if (this.event.users_favorites.indexOf(this.user.email)==-1) {
      this.event.users_favorites.push(this.user.email);
    }  
    this.presentToastAddFav();  
    this.eventService.updateEvent(this.event);
    /*this.eventService.addFavorites(this.event);
    this.isFavorite=true;*/
  }

  deleteFavorites() {
    this.event.users_favorites.splice(this.event.users_favorites.indexOf(this.user.email), 1)
    if(this.event.users_favorites.length==0) {
      this.event.users_favorites=['0'];
    } 
    this.eventService.updateEvent(this.event);
    /*this.eventService.removeFavorites(this.event);
    this.isFavorite = false;*/
  }

  shareEvent(value: Event) {
  }

  presentToastAddFav() {
    let toast = this.toastCtrl.create({
      message: 'Añadido a "Estoy intresado"!',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  presentToastReg() {
    let toast = this.toastCtrl.create({
      message: 'Estas registrado!',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  presentToastCancReg() {
    let toast = this.toastCtrl.create({
      message: 'Inscripción cancelada',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  myEvent (value: Event) {
    if (value.publicado_por==this.user.email) return true;
    return false;
  }



}
