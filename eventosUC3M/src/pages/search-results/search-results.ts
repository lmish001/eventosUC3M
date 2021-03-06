import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { EventDetailPage } from '../event-detail/event-detail';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user.model';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  tiempo: String;
  campus: String;
  categoria: String;
  type: String;
  input: String;
  horaMin: string;
  creditos: boolean;
  events$: Observable <any[]>;
  eventArray: Event[];
  user$: Observable <any[]>;
  user: User;
  userArray: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private eventService: EventService, private auth: AuthentificationService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultsPage');
  }

  ngOnInit() {
    this.campus = this.navParams.get('param1');
    this.tiempo = this.navParams.get('param2');
    this.categoria = this.navParams.get('param3');
    this.type = this.navParams.get('param4');
    this.input = this.navParams.get('param5').toLowerCase();
    this.horaMin = this.navParams.get('param6');
    this.creditos = this.navParams.get('param7');
   // console.log (this.tiempo, this.campus, this.categoria, this.type, this.input, this.horaMin, this.creditos);
    this.getUser();
    this.getEvents();

  }

  getEvents(): void {
    this.events$ = this.eventService.getEvents().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      

    
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.events$.forEach(value=>this.getEventsArray(value));
  }

  getEventsArray(value: any) {
    this.eventArray = [];
    for (let v of value) {
      if (this.type=='advanced') {
        console.log (v.credits);
        if (this.checkDate(v.date)&&this.checkCampus(v.campus)&&this.checkCategory(v.categories)&&this.checkCredits(v.credits)&&this.checkTime(v.date)) this.eventArray.push(v);
      }
      else {
        if (this.checkDate(v.date)&&v.name.toLowerCase().indexOf(this.input)!=-1) this.eventArray.push(v);
      }
    }
  }

  getUser() {
    this.user$ = this.auth.getCurrentUser().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      /*
      Estas líneas retornan un array de  objetos con el id del registro y su contenido
      {
        "key":"value",
        contact.name,
        contact.organization,
       ...
      }
      */
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.user$.forEach(value=>this.currentUser(value));
     
  }
  currentUser(value:any) {
    for (let v of value) {
      if (!this.userArray) this.userArray = [v];
      else { this.userArray.push(v);}
     
    }
    this.user = this.userArray[0];
  }

  checkTime (value: string) {
    if (this.getDate(this.horaMin).getHours() <this.getDate(value).getHours()) return true;
    return false;
  }

  checkCredits (value: any) {
    if (this.creditos==true&&(value==0||value=='0')) return false;
    return true;
  }
  checkCampus (value: String) {
    if (this.campus == "todos_campus") return true;
    if (this.campus==value) return true;
    return false
  }

  checkCategory (value: String[]) {
    if (this.categoria == "todos_catg") return true;
    for (let v of value) {
      if (v == this.categoria) return true;
    }
    return false;
  }

  getDate(value: string): Date {
    return new Date (value);
  }

  checkDate (value: string) {
    var curDate = new Date();
    if (this.tiempo=='todos_dias') {
      if (this.getDate(value) < curDate) return false;
    }
    if (this.tiempo=='semana') {
      if (this.getDate(value) < curDate || this.getDate(value)>this.nextWeek()) return false;
    }
    if (this.tiempo=='mes') {
      if (this.getDate(value) < curDate || this.getDate(value)>this.nextMonth()) return false;
    }
    return true;
  }

  nextWeek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
  }

  nextMonth(){
    var today = new Date();
    var nextmonth = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    return nextmonth;
  }

  addFavorites(value: Event) {
    let i = this.eventArray.indexOf(value);
    if (this.eventArray[i].users_favorites[0]=='0'){
      this.eventArray[i].users_favorites = [this.user.email];
    }
    else if (this.eventArray[i].users_favorites.indexOf(this.user.email)==-1) {
      this.eventArray[i].users_favorites.push(this.user.email);
  } 
  this.presentToastAdd();
  this.eventService.updateEvent(this.eventArray[i]);
  }

  deleteFavorites(value: Event) {
    let i = this.eventArray.indexOf(value);
    this.eventArray[i].users_favorites.splice(this.eventArray[i].users_favorites.indexOf(this.user.email), 1)
    if(this.eventArray[i].users_favorites.length==0) {
      this.eventArray[i].users_favorites=['0'];
    } 
    this.eventService.updateEvent(this.eventArray[i]);
  }

  isInFavorites(value: Event): boolean {   
      if(value.users_favorites[0]=='0') return false;
      if(value.users_favorites.indexOf(this.user.email)==-1) return false;
      return true;
  }

  presentToastAdd() {
    let toast = this.toastCtrl.create({
      message: 'Añadido a "Estoy intresado"!',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  shareEvent(value: Event) {

  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value, param2: this.user});
  }

  myEvent (value: Event) {
    if (value.publicado_por==this.user.email) return true;
    return false;
  }

}
