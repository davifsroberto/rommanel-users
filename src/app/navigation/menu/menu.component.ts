import { Component } from '@angular/core';

import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  img: string = environment.imagesLocal;

  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
  }
}
