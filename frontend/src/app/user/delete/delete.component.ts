import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  errors: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }

  deleteUser(eventId: any) {
    this.userService.deleteUser(eventId).subscribe(
      (sucess) => {
        this.processSuccessDelete(sucess);
      },
      (fail) => {
        this.processaFailDelete(fail);
      }
    );
  }

  processSuccessDelete(event: any) {
    const toast = this.toastr.success(
      'Usuário excluido com sucesso!',
      'Sucesso!',
      {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      }
    );

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/users/list']);
      });
    }
  }

  processaFailDelete(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
