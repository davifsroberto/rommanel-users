import { AppUserPage } from './app.new-user.po';
import { browser, logging } from 'protractor';

describe('Testes do formulario de cadastro', () => {
  let page: AppUserPage;

  beforeEach(() => {
    page = new AppUserPage();
  });

  it('deve navegar até usuários', () => {
    page.initNavigation();
    expect(page.getTitleUsers()).toEqual('Lista de Usuários');
  });

  it('deve preencher formulário de usuários com sucesso', () => {
    page.navigateToNewUser();

    page.name.sendKeys('Jhon Doe');
    page.email.sendKeys('email@teste.com');
    page.birthDate.sendKeys('10101999');
    page.document.sendKeys('11416557059');
    page.active.click;
    page.zipCode.sendKeys('06460070');
    page.wait(2000);
    // linhas abaixo comentadas, para ser utilizado o serviço de preenchimento de endereço através do cep.
    // page.street.sendKeys('Alameda Araguacema');
    page.number.sendKeys('785');
    page.additionalDetails.sendKeys('AP 57, Torre 2');
    // page.neighborhood.sendKeys('Tamboré');
    // page.city.sendKeys('Barueri');
    // page.selectState();

    page.btnUser.click();

    page.wait(3000);

    expect(page.getTitleUsers()).toEqual('Lista de Usuários');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
