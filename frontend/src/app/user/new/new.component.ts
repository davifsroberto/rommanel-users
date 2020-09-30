import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { UserService } from '../services/user.service';

import { StringUtils } from '@src/app/utils/string-utils';
import { UserBaseComponent } from '../user-form.base.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent
  extends UserBaseComponent
  implements OnInit, AfterViewInit {
  userForm: FormGroup;
  user: User = new User();

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  constructor(
    private fb: FormBuilder,
    protected userService: UserService,
    protected router: Router,
    protected toastr: ToastrService,
    private cdref: ChangeDetectorRef
  ) {
    super(userService, router, toastr);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      document: ['', [Validators.required, NgBrazilValidators.cpf]],
      active: ['', [Validators.required]],

      address: this.fb.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        additionalDetails: [''],
        neighborhood: ['', [Validators.required]],
        zipCode: ['', [Validators.required, NgBrazilValidators.cep]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      }),
    });

    this.userForm.patchValue({ active: true });
  }

  ngAfterViewInit(): void {
    super.validationFormUserBase(this.userForm);
    this.cdref.detectChanges();
  }

  getZipCode(zipCode: string) {
    return super.getZipCode(zipCode, this.userForm);
  }

  newUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = Object.assign({}, this.user, this.userForm.value);

      this.formResult = JSON.stringify(this.user);

      this.user.address.zipCode = StringUtils.justNumbers(
        this.user.address.zipCode
      );
      this.user.document = StringUtils.justNumbers(this.user.document);
      this.user.birthDate = StringUtils.formatDate(this.user.birthDate);

      this.userService.postUser(this.user).subscribe(
        (sucess) => {
          super.processSuccess(this.userForm, 'cadastrado', sucess);
        },
        (fail) => {
          super.processaFail(fail);
        }
      );
    }
  }
}
