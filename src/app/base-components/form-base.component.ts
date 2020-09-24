import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import {
  GenericValidator,
  DisplayMessage,
  ValidationMessages,
} from '../utils/generic-form-validation';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  changesNotSave: boolean;

  protected configMessagesValidationBase(
    validationMessages: ValidationMessages
  ) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configValidationFormBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ) {
    let controlBlurs: Observable<
      any
    >[] = formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validationForm(formGroup);
    });
  }

  protected validationForm(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processMessages(formGroup);
    this.changesNotSave = true;
  }
}
