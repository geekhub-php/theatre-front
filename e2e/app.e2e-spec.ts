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
    mainMenu.navigateTo('HOME');
    expect(element(by.css('p')).getText()).toContain('home-page works');
  });

  it('shold navigate to Poster', () => {
    page.navigateTo();
    mainMenu.navigateTo('POSTER');
    expect(element(by.css('p')).getText()).toContain('schedule works');
  });

  it('shold navigate to Repertoire', () => {
    page.navigateTo();
    mainMenu.navigateTo('REPERTOIRE');
    expect(element(by.css('h1')).getText()).toContain('Repertoire');
  });

  it('shold navigate to News', () => {
    page.navigateTo();
    mainMenu.navigateTo('NEWS');
    expect(element(by.css('p')).getText()).toContain('news-list works');
  });

  it('shold navigate to About Us', () => {
    page.navigateTo();
    mainMenu.navigateTo('ABOUT US');
    expect(element(by.css('p')).getText()).toContain('about works');
  });

  it('shold navigate to Persons', () => {
    page.navigateTo();
    mainMenu.navigateTo('PERSONS');
    expect(element(by.css('p')).getText()).toContain('team-list works');
  });

  it('shold navigate to Contacts', () => {
    page.navigateTo();
    mainMenu.navigateTo('CONTACTS');
    expect(element(by.css('p')).getText()).toContain('contacts works');
  });
});
