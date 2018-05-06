import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categories, Campus } from '../globalTypes';
import { Search } from '../models/search.model';
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
  searchForm: FormGroup;
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro']
  constructor(public navCtrl: NavController, public navParams: NavParams, public formB: FormBuilder) {
    this.searchForm = formB.group ({
      tiempo: ["todos_dias", Validators.required],
      campus: ["todos_campus", Validators.required],
      categoria: ["todos_catg", Validators.required],    
    });
  }

  submitSearchForm() {
    let data = this.searchForm.value
    this.search = {
      campus: data.campus,
      tiempo: data.tiempo,
      categoria: data.categoria
    }
    this.navCtrl.push(SearchResultsPage, {param1: this.search.campus, param2: this.search.tiempo, param3: this.search.categoria})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
