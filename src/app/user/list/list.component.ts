import { Component, OnInit } from '@angular/core';

import { User } from '@app/user/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public users: User[];
  errorMessage: string;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  listUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => (this.users = users),
      (error) => this.errorMessage
    );
  }

  ngOnInit() {
    this.spinner.show();

    this.listUsers();

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }
}
