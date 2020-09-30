import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class UserResolve implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUser(route.params['id']);
  }
}
