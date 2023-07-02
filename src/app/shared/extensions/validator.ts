import { AbstractControl } from "@angular/forms";

export default class Validation {
    public static match(controlName: string, checkControlName: string) {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl?.errors['matching']) {
                // return if another validator has already found an error on the matchingControl
                return null;
            }

            if (control?.value !== checkControl?.value) {
                controls.get(checkControlName)?.setErrors({ matching: true });
                return { matching: true };
            }
            else
                return null;

        }
    }
}