import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';


import  {IngredientModel} from  '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

  @ViewChild('f') slForm : NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : IngredientModel;

 // @ViewChild('nameInput') nameInputRef: ElementRef;
 // @ViewChild('amountInput') amountInputRef: ElementRef;

 // @Output() ingredientAdded = new EventEmitter<IngredientModel>();

  constructor(private slService: ShoppingListService) {}


  ngOnInit() {
    this.subscription =  this.slService.startedEditing
      .subscribe(
        (index :number) => {
          this.editedItemIndex = index;
          this.editMode= true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name : this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredientModel = new IngredientModel(value.name, value.amount);
  //  this.ingredientAdded.emit(newIngredientModel);

    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredientModel);
    } else {
      this.slService.addIngredientModel(newIngredientModel);
    }
    this.editMode = false;
       form.reset();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
