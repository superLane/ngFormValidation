import { AbstractControl } from "@angular/forms";

export function matchEmail(control: AbstractControl):{[key: string]: boolean}{
    let email = control.get('emailAddress').value;
    let confEmail = control.get('confEmailAddress').value;

    if (!email || !confEmail){
        return null;
    }

    if (email === confEmail) {
        return null;
    }
    return {
        mismatch: true
    };

}