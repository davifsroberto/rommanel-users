import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from '../../services/base.service';
import { Address, CepConsult } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.UrlServiceV1}users`)
      .pipe(catchError(super.serviceError));
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.UrlServiceV1}users/${id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  postUser(user: User): any {
    return this.http
      .post(`${this.UrlServiceV1}users`, user, this.GetHeaderJson())
      .pipe(
        map((userResp: User) => {
          user.address.userId = userResp.id;
          user.id = userResp.id;
          this.postAddress(user.address);
        })
      );
  }

  putUser(user: User): Observable<User> {
    return this.http
      .put(`${this.UrlServiceV1}users/${user.id}`, user, this.GetHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  putAddress(address: Address): Observable<Address> {
    return this.http
      .put(
        `${this.UrlServiceV1}users/${address.userId}/address/${address.id}`,
        address,
        this.GetHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  deleteUser(id: string): Observable<User> {
    return this.http
      .delete(`${this.UrlServiceV1}users/${id}`, this.GetHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  postAddress(address: Address): void {
    this.http
      .post(
        `${this.UrlServiceV1}users/${address.userId}/address`,
        address,
        this.GetHeaderJson()
      )
      .subscribe();
  }

  consultCep(cep: string): Observable<CepConsult> {
    return this.http
      .get<CepConsult>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}
