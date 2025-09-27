import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');

  if (!password || !repassword) {
    return null; 
  }

  return password.value === repassword.value ? null : { passwordMismatch: true };
};
