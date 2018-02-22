import {browser, by, element, ElementFinder} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
}

export class MainMenu {
  navEl = element(by.css('app-root app-main-menu nav'));

  navigateTo(text) {
    const link = this.getLink(text);
    expect(link.isPresent).toBeTruthy();
    link.click();
  }

  private getLink(text) {
      return this.navEl.element(by.cssContainingText('a', text));
  }
}
