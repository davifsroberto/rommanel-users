import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { StringUtils } from '@src/app/utils/string-utils';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { UserService } from '../services/user.service';
import { UserBaseComponent } from '../user-form.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent
  extends UserBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  errorsAddress: any[] = [];
  userForm: FormGroup;
  addressForm: FormGroup;

  user: User = new User();
  address: Address = new Address();
  addressUser: Address = new Address();

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    protected router: Router,
    protected userService: UserService,
    protected toastr: ToastrService,
    private cdref: ChangeDetectorRef
  ) {
    super(userService, router, toastr);

    this.user = this.route.snapshot.data.user;
    this.addressUser = this.route.snapshot.data.user.address[0];
  }

  ngOnInit() {
    this.spinner.show();

    this.userForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      document: ['', [Validators.required, NgBrazilValidators.cpf]],
      active: ['', [Validators.required]],
    });

    this.addressForm = this.fb.group({
      id: '',
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      additionalDetails: [''],
      neighborhood: ['', [Validators.required]],
      zipCode: ['', [Validators.required, NgBrazilValidators.cep]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      userId: '',
    });

    this.fillForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }

  fillForm() {
    this.userForm.patchValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      document: this.user.document,
      birthDate: StringUtils.formatDateTime(this.user.birthDate),
      active: this.user.active,
    });

    this.addressForm.patchValue({
      id: this.addressUser.id,
      street: this.addressUser.street,
      number: this.addressUser.number,
      additionalDetails: this.addressUser.additionalDetails,
      neighborhood: this.addressUser.neighborhood,
      zipCode: this.addressUser.zipCode,
      city: this.addressUser.city,
      state: this.addressUser.state,
    });
  }

  ngAfterViewInit(): void {
    super.validationFormUserBase(this.userForm);
    this.cdref.detectChanges();
  }

  getZipCode(zipCode: string) {
    return super.getZipCode(zipCode, this.addressForm);
  }

  editUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = Object.assign({}, this.user, this.userForm.value);

      this.user.document = StringUtils.justNumbers(this.user.document);
      this.user.birthDate = StringUtils.formatDate(this.user.birthDate);

      this.userService.putUser(this.user).subscribe(
        (sucess) => {
          super.processSuccess(this.userForm, 'atualizado', sucess);
        },
        (fail) => {
          super.processaFail(fail);
        }
      );
    }
  }

  editAddress() {
    if (this.addressForm.dirty && this.addressForm.valid) {
      this.address = Object.assign({}, this.address, this.addressForm.value);

      this.address.zipCode = StringUtils.justNumbers(this.address.zipCode);
      this.address.userId = this.user.id;

      this.userService.putAddress(this.address).subscribe(
        () => this.processSuccessAddress(this.address),

        (fail) => {
          this.processaFail(fail);
        }
      );
    }
  }

  processSuccessAddress(address: Address) {
    this.errors = [];
    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });

    this.user.address = address;
    this.modalService.dismissAll();
  }

  processaFailAddress(fail: any) {
    this.errorsAddress = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  showModal(content) {
    this.modalService.open(content);
  }
}
