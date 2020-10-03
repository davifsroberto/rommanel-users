import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnDestroy {
  private subscriptions = new Subscription();

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteUser(eventId: string) {
    this.subscriptions.add(
      this.userService.deleteUser(eventId).subscribe(
        () => this.processSuccessDelete(),
        () => this.processaFailDelete()
      )
    );
  }

  processSuccessDelete() {
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
      this.subscriptions.add(
        toast.onHidden.subscribe(() => {
          this.router.navigate(['/users/list']);
        })
      );
    }
  }

  processaFailDelete() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
