import {Component,Output,EventEmitter} from '@angular/core';
import {Response} from '@angular/http';

import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private  dataStorageService: DataStorageService,
              private authService:AuthService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData(){
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }


}
 // @Output() featureSelected = new EventEmitter<string>();


  //onSelect(feature: string) {
  //  this.featureSelected.emit(feature);
 // }

