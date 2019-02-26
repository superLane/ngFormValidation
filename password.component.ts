import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RegFormService } from '../reg-form.service';
import { PasswordMatcher } from '../passwordMatcher';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  // @Output() accountPassFormReady = new EventEmitter<FormGroup>()
  accountPassForm: FormGroup;
  private nextStepAttempt: boolean;

  constructor(private fb: FormBuilder, 
              private formService: RegFormService,
              private route: Router) { }

  ngOnInit() {
    if(!this.formService.getPasswordConfig()) {
      this.accountPassForm = this.fb.group({
        accountPass: [ '', 
          [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
        ]],
        accountConfPass: [ '',
          [Validators.required]
        ]
      }, {validator: PasswordMatcher});
    } else {
      this.accountPassForm = this.formService.getPasswordConfig();
    }
    //emit the form group
    ///// this.accountPassFormReady.emit(this.accountPassForm);
  }

  onContinue() {
    this.nextStepAttempt = true;


    if (this.accountPassForm.status === 'VALID'){ 
      this.formService.setPasswordConfig(this.accountPassForm);
      this.route.navigate(['/','accountInfo'])
    }
  }

  onBack(){
    this.formService.setPasswordConfig(this.accountPassForm);
  }

  isFieldValid(field: string) {
    return (
      (this.accountPassForm.get(field).hasError('required') && this.accountPassForm.get(field).touched) ||
      (this.accountPassForm.get(field).untouched && this.nextStepAttempt)
    );
  }

  isFieldConformant(field: string){
    return (this.accountPassForm.get(field).hasError('minlength') ||         
         this.accountPassForm.get(field).hasError('maxLength')) ||
         this.accountPassForm.get(field).hasError('pattern');

  }

  isFieldMatch(field: string) {
    return (this.accountPassForm.hasError('mismatch'));
  }

}