import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import { BaseService } from '../../services/base.service';
import { Address, CepConsult } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends BaseService implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private http: HttpClient,
    protected dbService: NgxIndexedDBService
  ) {
    super(dbService);

    this.listenStatusConection();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.UrlServiceV1}users`)
      .pipe(catchError(super.serviceError));
  }

  getUser(_id: string): Observable<User> {
    return this.http
      .get<User>(`${this.UrlServiceV1}users/${_id}`, super.GetHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  putUser(user: User): Observable<User> {
    return this.http
      .put(`${this.UrlServiceV1}users/${user._id}`, user, this.GetHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  putAddress(address: Address): Observable<Address> {
    return this.http
      .put(
        `${this.UrlServiceV1}users/${address.userId}/address/${address._id}`,
        address,
        this.GetHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  deleteUser(_id: string): Observable<User> {
    return this.http
      .delete(`${this.UrlServiceV1}users/${_id}`, this.GetHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  private postUserIdbToApi(): void {
    this.subscriptions.add(
      this.dbService.getAll('users').subscribe((users) => {
        users.map((user) => {
          this.postUserApi(user).subscribe();
        }, this.dbService.clear('users').subscribe());
      })
    );
  }

  private postUserApi(user: User): Observable<User> {
    return this.http
      .post(`${this.UrlServiceV1}users`, user, this.GetHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
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
