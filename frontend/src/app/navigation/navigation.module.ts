import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  NgbCollapseModule,
  NgbNavModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';

import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbRatingModule,
  ],
  declarations: [
    MenuComponent,
    NotFoundComponent,
    FooterComponent,
    HomeComponent,
  ],
  exports: [MenuComponent, NotFoundComponent, FooterComponent, HomeComponent],
})
export class NavigationModule {}
