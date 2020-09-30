import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common/';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { IndexedDB } from '@app/utils/indexed-db';
import { UserService } from './services/user.service';
import { UserResolve } from './services/user.resolve';
import { UserRoutingModule } from './user.route';
import { UserGuard } from './services/user.guard';
import { UserAppComponent } from './user.app.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import { NewComponent } from './new/new.component';
import { InfoUserComponent } from './info-user/info-user.component';

@NgModule({
  declarations: [
    UserAppComponent,
    ListComponent,
    EditComponent,
    DetailComponent,
    DeleteComponent,
    NewComponent,
    InfoUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(IndexedDB.userDb()),
  ],
  providers: [
    UserGuard,
    UserService,
    UserResolve,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
})
export class UserModule {}
