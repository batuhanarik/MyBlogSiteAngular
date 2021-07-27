import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MyvalidationService {

  constructor() { }

  getValidationMessage(f:AbstractControl,name:string){

    if(f.errors){
      for(let error in  f.errors){
        if(error==="required")
          return `${name} alanı boş bırakılamaz.`;

        else if(error==="email")
          return `Email formatı yanlış`;

        else if(error==="minlength")
          return `${name} alanı en az 5 karakter olmalıdır.`;
      }
    }
  }
}
