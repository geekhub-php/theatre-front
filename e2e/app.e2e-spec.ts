import { AppPage, MainMenu } from './app.po';
import { by, element } from 'protractor';

describe('theatre-front App', () => {
  let page: AppPage;
  let mainMenu: MainMenu;

  beforeEach(() => {
    page = new AppPage();
    mainMenu = new MainMenu();
  });

  it('should navigate to Home', () => {
    page.navigateTo();
    mainMenu.navigateTo('Main page');
    expect(element(by.css('.page-title')).getText()).toContain('News');
  });

  it('should navigate to Poster', () => {
    page.navigateTo();
    mainMenu.navigateTo('Poster');
    expect(element(by.css('h2')).getText()).toContain('Poster for');
  });

  it('should navigate to Repertoire', () => {
    page.navigateTo();
    mainMenu.navigateTo('Repertoire');
    expect(element(by.css('h2')).getText()).toContain('Repertoire');
  });

  it('should navigate to NewsItem', () => {
    page.navigateTo();
    mainMenu.navigateTo('News');
    expect(element(by.css('h2')).getText()).toContain('News');
  });

  it('should navigate to About Us', () => {
    page.navigateTo();
    mainMenu.navigateTo('About');
    expect(element(by.css('h2')).getText()).toContain('About');
  });

  it('should navigate to Persons', () => {
    page.navigateTo();
    mainMenu.navigateTo('Persons');
    expect(element(by.css('h2')).getText()).toContain('Persons');
  });

  it('should navigate to Contacts', () => {
    page.navigateTo();
    mainMenu.navigateTo('Contacts');
    expect(element(by.css('h2')).getText()).toContain('Contacts');
  });
});
