import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean;
  success: boolean;
  info: string;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }

  onSubmit(){
    if(this.contactForm.valid){
      this.loading = true;
      this.helperService.sendContactEmail(this.contactForm.value).subscribe(data=>{
      this.loading = false;
        this.success = true;
        this.contactForm.reset();
        this.info = "Mesajınız iletilmiştir,en kısa sürede dönüş yapılacaktır.";

      },error=>{
      this.loading = false;
        this.success = false;
        this.info = "Bir hata meydana geldi,lütfen daha sonra tekrar deneyin";
      });

    }else{
      return false;
    }
  }

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

  get getControls(){
    return this.contactForm.controls;
  }

}
