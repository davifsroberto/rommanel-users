import { Component, HostListener } from '@angular/core';

import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public isCollapsed: boolean;
  img: string = environment.imagesLocal;

  constructor() {
    this.isCollapsed = true;
  }

  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();

    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    this.showButton = false;

    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice.then(() => {
      this.deferredPrompt = null;
    });
  }
}
