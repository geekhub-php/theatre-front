/* tslint:disable:max-classes-per-file */
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
}

export class MainMenu {
  navEl = element(by.css('app-root .navbar-nav'));

  navigateTo(text) {
    const link = this.getLink(text);
    expect(link.isPresent()).toBe(true);
    expect(link.isDisplayed()).toBe(true);
    link.click();
  }

  private getLink(text) {
      return this.navEl.element(by.cssContainingText('a', text));
  }
}
