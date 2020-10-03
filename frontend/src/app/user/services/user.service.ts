import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import { BaseService } from '../../services/base.service';
import { Address, CepConsult } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends BaseService {
  constructor(
    private http: HttpClient,
    protected dbService: NgxIndexedDBService
  ) {
    super(dbService);

    this.listenStatusConection();
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

  private postUserApi(user: User): any {
    return this.http
      .post(`${this.UrlServiceV1}users`, user, this.GetHeaderJson())
      .pipe(
        map((userResp: User) => {
          user.address.userId = userResp.id;
          user.id = userResp.id;
          // TODO: Remover esse "postAddress"
          this.postAddress(user.address);
        })
      );
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

  private postUserIdbToApi(): any {
    this.dbService.getAll('users').subscribe((users) => {
      users.map((user) => {
        this.postUserApi(user).subscribe();
      }, this.dbService.clear('users').subscribe());
    });
  }

  postUser(user: User): Observable<User> {
    if (super.isOnline) {
      return this.postUserApi(user);
    } else {
      return super.postIndexedDB(user, 'users');
    }
  }

  private listenStatusConection(): void {
    super.statusConection.subscribe((online) => {
      if (online) this.postUserIdbToApi();
    });
  }

  consultCep(cep: string): Observable<CepConsult> {
    return this.http
      .get<CepConsult>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}
