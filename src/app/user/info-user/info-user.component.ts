import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '@src/environments/environment';

import { utilsBr } from 'js-brasil';

import { Address } from '../models/address.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
})
export class InfoUserComponent {
  img: string = environment.imagesLocal;
  keyMpas: string = environment.keyMaps;
  MASKS = utilsBr.MASKS;
  addressMap;

  constructor(private sanitizer: DomSanitizer) {}

  public AdressFull(): string {
    return `
      ${this.address.street}
      ${this.address.number}
      ${this.address.neighborhood}
      ${this.address.city}
      ${this.address.state}
    `;
  }

  @Input()
  optionText: string;

  @Input()
  btnClass: string;

  @Input()
  user: User;

  @Input()
  address: Address;

  @Output() notifyParent: EventEmitter<string> = new EventEmitter();
  optionEvent(id) {
    this.notifyParent.emit(id);
  }

  ngOnInit(): void {
    this.addressMap = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=
      ${this.AdressFull()}
      &key=${this.keyMpas}`
    );
  }
}
