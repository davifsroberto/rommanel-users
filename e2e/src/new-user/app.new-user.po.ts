import { by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppUserPage extends AppBasePage {
  constructor() {
    super();
  }

  navigateToUsers() {
    this.navigateByLink('Usuários');
  }

  navigateToNewUser() {
    this.navigateByLink('Novo usuário');
  }

  initNavigation() {
    this.navigateToHome();
    this.navigateToUsers();
  }

  getTitleUsers() {
    return this.getXpathElement(
      '/html/body/app-root/app-list/article/div/h3'
    ).getText();
  }

  selectState() {
    this.listState.get(2).click();
  }

  name = element(by.id('name'));
  email = element(by.id('email'));
  birthDate = element(by.id('birthDate'));
  document = element(by.id('document'));
  active = element(by.id('active'));
  zipCode = element(by.id('zipCode'));
  street = element(by.id('street'));
  number = element(by.id('number'));
  additionalDetails = element(by.id('additionalDetails'));
  neighborhood = element(by.id('neighborhood'));
  city = element(by.id('city'));
  listState = element.all(by.tagName('option'));

  btnUser = element(by.id('newUser'));
}
