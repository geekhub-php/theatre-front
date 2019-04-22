import { AppPage, MainMenu } from './app.po';
import { by, element } from 'protractor';

describe('theatre-front App', () => {
  let page: AppPage;
  let mainMenu: MainMenu;

  beforeEach(() => {
    page = new AppPage();
    mainMenu = new MainMenu();
  });

  it('shold navigate to Home', () => {
    page.navigateTo();
    mainMenu.navigateTo('Головна');
    expect(element(by.css('h3')).getText()).toContain('Новини');
  });

  it('shold navigate to Poster', () => {
    page.navigateTo();
    mainMenu.navigateTo('Афіша');
    expect(element(by.css('h2')).getText()).toContain('Poster');
  });

  it('shold navigate to Repertoire', () => {
    page.navigateTo();
    mainMenu.navigateTo('Репертуар');
    expect(element(by.css('h2')).getText()).toContain('Репертуар');
  });

  it('shold navigate to NewsItem', () => {
    page.navigateTo();
    mainMenu.navigateTo('Новини');
    expect(element(by.css('h2')).getText()).toContain('Новини');
  });

  it('shold navigate to About Us', () => {
    page.navigateTo();
    mainMenu.navigateTo('Про театр');
    expect(element(by.css('h2')).getText()).toContain('Про Театр');
  });
  //
  // it('shold navigate to Persons', () => {
  //   page.navigateTo();
  //   mainMenu.navigateTo('Персоналії');
  //   expect(element(by.css('p')).getText()).toContain('Посада:');
  // });

  it('shold navigate to Contacts', () => {
    page.navigateTo();
    mainMenu.navigateTo('Контакти');
    expect(element(by.css('h2')).getText()).toContain('Контакти');
  });
});
