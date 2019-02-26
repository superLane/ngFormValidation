import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegFormService } from '../reg-form.service';
import { matchEmail } from '../matchEmail';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  // @Input() accountPassFormReady : FormGroup;
  accountRegForm: FormGroup;
  private nextStepAttempt: boolean
  
  constructor(private fb: FormBuilder, 
              private formService: RegFormService,
              private route: Router) { }

  ngOnInit() {
    if(!this.formService.getCustomerConfig()) {
      this.accountRegForm = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        confEmailAddress: [ '', [Validators.required, Validators.email]]
      }, {validator: matchEmail});
    } else {
      this.accountRegForm = this.formService.getCustomerConfig();
    }
  }

  formInitialized(name: string, form: FormGroup){
    this.accountRegForm.setControl(name,form);
  }
  
  onContinue() {
    this.nextStepAttempt = true;

    if (this.accountRegForm.valid){ 
      this.formService.setCustomerConfig(this.accountRegForm);
      this.route.navigate(['/','password'])
    }
  }

  // get firstName(){
  //   return this.accountRegForm.get('firstName');
  // }
 

  isFieldValid(field: string) {
    return (
      (this.accountRegForm.get(field).hasError('required') && this.accountRegForm.get(field).touched) ||
      (this.accountRegForm.get(field).untouched && this.nextStepAttempt)
    );
  }

  isFieldEmail(field: string) {
    return (this.accountRegForm.get(field).hasError('email') && this.accountRegForm.get(field).touched)
  }

  isFieldMatch(field: string) {
    return (this.accountRegForm.hasError('mismatch'));
  }
   
}
