import {browser, by, element, ElementFinder} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getMainMenu() {
    return element(by.css('app-root app-main-menu nav'));
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
      // this.navEl.all(by.css('a')).then(function(elements: Array<ElementFinder>) {
      //     elements.forEach(function(el: ElementFinder) {
      //         el.getText().then(function(elText: string) {
      //             console.log(elText);
      //         });
      //     });
      // });
      return this.navEl.element(by.cssContainingText('a', text));
  }
}
