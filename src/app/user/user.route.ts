import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from './services/user.guard';
import { UserResolve } from './services/user.resolve';
import { UserAppComponent } from './user.app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';

const userRouterConfig: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '', component: UserAppComponent },
      { path: 'list', component: ListComponent },

      { path: 'new', component: NewComponent, canDeactivate: [UserGuard] },

      {
        path: 'edit/:id',
        component: EditComponent,
        canDeactivate: [UserGuard],
        resolve: {
          user: UserResolve,
        },
      },

      {
        path: 'detail/:id',
        component: DetailComponent,
        canDeactivate: [UserGuard],
        resolve: {
          user: UserResolve,
        },
      },

      {
        path: 'delete/:id',
        component: DeleteComponent,
        resolve: {
          user: UserResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRouterConfig)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
