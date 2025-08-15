import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const registrationDate = control.get('registrationDate');
  const deliveryDate = control.get('deliveryDate');

  if (registrationDate?.value && deliveryDate?.value && registrationDate.value > deliveryDate.value) {
    return { dateRangeInvalid: true };
  }

  return null;
};