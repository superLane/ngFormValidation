import { AbstractControl } from '@angular/forms';

export function PasswordMatcher (control: AbstractControl):{[key: string]: boolean} {
       // console.log(regForm, 'form')
        let accountPass = control.get('accountPass').value;
        let accountConfPass = control.get('accountConfPass').value;
        if (accountConfPass.length <= 0){
            return null;
        }
        
        if (accountConfPass !== accountPass){
            return {
                mismatch: true
            }
        }

        return null;
}