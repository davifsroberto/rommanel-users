import { FormBaseComponent } from '../base-components/form-base.component';
import { FormGroup, FormControlName } from '@angular/forms';

import { Directive, ElementRef, ViewChildren } from '@angular/core';
import { StringUtils } from '../utils/string-utils';
import { UserService } from './services/user.service';
import { CepConsult } from './models/address.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Directive()
export class UserBaseComponent extends FormBaseComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];

  constructor(
    protected userService: UserService,
    protected router: Router,
    protected toastr: ToastrService
  ) {
    super();

    let messages: {} = super.validationMessages;
    messages = {
      name: {
        required: 'Informe o Nome',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      birthDate: {
        required: 'Informe a data de nascimento',
      },
      document: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
      },
      street: {
        required: 'Informe o Logradouro',
      },
      number: {
        required: 'Informe o Número',
      },
      neighborhood: {
        required: 'Informe o Bairro',
      },
      zipCode: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido',
      },
      city: {
        required: 'Informe a Cidade',
      },
      state: {
        required: 'Informe o Estado',
      },
    };

    super.configMessagesValidationBase(messages);
  }

  protected validationFormUserBase(userForm: FormGroup) {
    super.configValidationFormBase(this.formInputElements, userForm);
    super.validationForm(userForm);

    super.configValidationFormBase(this.formInputElements, userForm);
  }

  protected getZipCode(zipCode: string, userForm: any) {
    zipCode = StringUtils.justNumbers(zipCode);
    if (zipCode.length < 8) return;

    this.userService.consultCep(zipCode).subscribe(
      (cepReturn) => this.fillAddressConsult(cepReturn, userForm),
      (erro) => this.errors.push(erro)
    );
  }

  protected fillAddressConsult(cepConsult: CepConsult, userForm: any) {
    if (userForm.value.address) {
      userForm.patchValue({
        address: {
          street: cepConsult.logradouro,
          neighborhood: cepConsult.bairro,
          zipCode: cepConsult.cep,
          city: cepConsult.localidade,
          state: cepConsult.uf,
        },
      });
    } else {
      userForm.patchValue({
        street: cepConsult.logradouro,
        neighborhood: cepConsult.bairro,
        zipCode: cepConsult.cep,
        city: cepConsult.localidade,
        state: cepConsult.uf,
      });
    }
  }

  protected processSuccess(
    userForm: FormGroup,
    status: string,
    response: any | null
  ) {
    userForm.reset();
    this.errors = [];

    this.changesNotSave = false;

    let toast = this.toastr.success(`Usuário ${status}!`, 'Sucesso!', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/users/list']);
      });
    }
  }

  protected processaFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
