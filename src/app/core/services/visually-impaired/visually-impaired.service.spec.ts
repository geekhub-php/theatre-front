import { TestBed } from '@angular/core/testing';

import { VisuallyImpairedService } from './visually-impaired.service';

describe('VisuallyImpairedService', () => {
  let service: VisuallyImpairedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisuallyImpairedService],
    });

    service = TestBed.get(VisuallyImpairedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get HTML DOM Element', () => {
    expect(service['htmlDomEl'].nodeName).toEqual('HTML');
  });

  it('should check local storage', () => {
    localStorage.setItem('visually-impaired', JSON.stringify(service['localStorageVI']));

    service.checkLocalStorage();
    expect(service['visuallyImpaired']).toEqual(service['localStorageVI']);

    localStorage.removeItem('visually-impaired');
    service.checkLocalStorage();
    expect(service['visuallyImpaired']).toEqual(null);
  });

  it('should get styles from local storage and put to HTML DOM element', () => {
    localStorage.setItem('visually-impaired', JSON.stringify(service['localStorageVI']));

    service.checkLocalStorage();
    expect(service['htmlDomEl'].style.fontSize).toEqual('14px');
    expect(service['htmlDomEl'].style.filter).toEqual('none');

    localStorage.removeItem('visually-impaired');
    service.checkLocalStorage();
    expect(service['htmlDomEl'].style.fontSize).toEqual('14px');
    expect(service['htmlDomEl'].style.filter).toEqual('none');
  });

  it('should push/put styles to DOM element', () => {
    service.setStylesOnElement({ fontSize: '24px' }, service['htmlDomEl']);
    service.setStylesOnElement({ filter: 'none' }, service['htmlDomEl']);

    expect(service['htmlDomEl'].style.fontSize).toEqual('24px');
    expect(service['htmlDomEl'].style.filter).toEqual('none');
  });
});
