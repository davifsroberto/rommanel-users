import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';

import { UserService } from '../services/user.service';
import { User } from '@app/user/models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public users: User[];

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.listUsers();

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }

  listUsers(): void {
    this.subscriptions.add(
      this.userService.getUsers().subscribe((users) => (this.users = users))
    );
  }
}
