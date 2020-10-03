import {
  ElementRef,
  Inject,
  Injectable,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fromEvent, merge, Observable, Subscription } from 'rxjs';

import {
  GenericValidator,
  DisplayMessage,
  ValidationMessages,
} from '../utils/generic-form-validation';

@Injectable()
export abstract class FormBaseComponent implements OnDestroy {
  protected subscriptions = new Subscription();

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  changesNotSave: boolean;

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

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

    this.subscriptions.add(
      merge(...controlBlurs).subscribe(() => {
        this.validationForm(formGroup);
      })
    );
  }

  protected validationForm(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processMessages(formGroup);
    this.changesNotSave = true;
  }
}
