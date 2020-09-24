import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }

  navigationList(eventId: string): void {
    this.router.navigateByUrl(`/users/edit/${eventId}`);
  }
}
