import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static checkPasswordMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        console.error('form control not found');
        return { controlNotFound: true };
      }
      const error =
        password.value !== confirmPassword.value
          ? { passwordMismatch: true }
          : null;
      confirmPassword.setErrors(error);
      return error;
    };
  }
}
