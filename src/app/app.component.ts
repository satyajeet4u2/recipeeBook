import { Component, OnInit } from '@angular/core';
import * as  firebase from  'firebase';
//import firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit{
   loadedFeature = 'recipe';

   ngOnInit(){
     firebase.initializeApp({
       apiKey: "AIzaSyD7LNfvhrza5epGsaNiXI_bRxhQeOdHDY8",
       authDomain: "ng-recipe-book-de1cb.firebaseapp.com"

     });
   }

  onNavigate(feature:string){
    this.loadedFeature = feature;
  }


}
