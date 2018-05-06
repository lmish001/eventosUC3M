import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categories, Campus } from '../../globalTypes';
import { Search } from '../../models/search.model';
import { SearchResultsPage } from '../search-results/search-results';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search: Search;
  input: String;
  searchForm: FormGroup;
  defaultHour: string = new Date().toISOString();
 
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro']
  constructor(public navCtrl: NavController, public navParams: NavParams, public formB: FormBuilder) {
    this.searchForm = formB.group ({
      tiempo: ["todos_dias", Validators.required],
      campus: ["todos_campus", Validators.required],
      categoria: ["todos_catg", Validators.required],    
      horaMin: [this.defaultHour, Validators.required],
      creditos: [false, Validators.required]

    });
    

  }

  submitSearchForm() {
    let data = this.searchForm.value
    this.search = {
      type: 'advanced',
      input: '',
      campus: data.campus,
      tiempo: data.tiempo,
      categoria: data.categoria,
      horaMin: data.horaMin,
      creditos: data.creditos
    }
    this.navCtrl.push(SearchResultsPage, {param1: this.search.campus, param2: this.search.tiempo, param3: this.search.categoria, param4: this.search.type, param5: this.search.input, param6: this.search.horaMin, param7: this.search.creditos});
  }

  submitBasicSearchForm() {
    this.search = {
      type: 'basic',
      input: this.input,
      campus: '',
      tiempo: "todos_dias",
      categoria: '',
      horaMin: '',
      creditos: false
    }
    this.navCtrl.push(SearchResultsPage, {param1: this.search.campus, param2: this.search.tiempo, param3: this.search.categoria, param4: this.search.type, param5: this.search.input, param6: this.search.horaMin, param7: this.search.creditos});
  }

  getInput(ev: any) {
    this.input = ev.target.value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


}
