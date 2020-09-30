import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import { environment } from '@src/environments/environment';

export abstract class BaseService {
  protected UrlServiceV1: string = environment.apiV1.url;

  private statusConection$ = new Subject<boolean>();

  constructor(protected dbService: NgxIndexedDBService) {
    window.addEventListener('online', () => this.updateConection());
    window.addEventListener('offline', () => this.updateConection());
  }

  protected get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  protected get statusConection(): Observable<boolean> {
    return this.statusConection$.asObservable();
  }

  protected updateConection() {
    return this.statusConection$.next(this.isOnline);
  }

  protected postIndexedDB<T>(object: T, store: string): any {
    return this.dbService
      .add(store, object)
      .pipe(catchError(this.serviceError));
  }

  protected GetHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];
    let customResponse = { error: { errors: [] } };

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    if (response.status === 500) {
      customError.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.'
      );

      customResponse.error.errors = customError;
      return throwError(customResponse);
    }

    console.error(response);
    return throwError(response);
  }
}
