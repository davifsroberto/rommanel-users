import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';

import { NewComponent } from '../new/new.component';

@Injectable()
export class UserGuard implements CanDeactivate<NewComponent> {
  constructor(protected router: Router) {}

  canDeactivate(component: NewComponent) {
    if (component.changesNotSave) {
      return window.confirm(
        'Tem certeza que deseja abandonar o preenchimento do formulario?'
      );
    }
    return true;
  }
}
