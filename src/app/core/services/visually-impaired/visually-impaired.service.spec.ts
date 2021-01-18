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
    expect(service['htmlDomEl'].style.filter).toBeTruthy();

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

  it('should set sepia filter', () => {
    service.setSepia();

    expect(service['htmlDomEl'].style.filter).toEqual('sepia(100%)');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['colorSchema']).toEqual('sepia');
  });

  it('should inverse colors filter', () => {
    service.inverseColors();

    expect(service['htmlDomEl'].style.filter).toEqual('invert(100%)');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['colorSchema']).toEqual('invert');
  });

  it('should set black-white theme', () => {
    service.setBlackWhite();

    expect(service['htmlDomEl'].className).toEqual('theme-black-white');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['colorSchema']).toEqual('black-white');
  });

  it('should set white-black theme', () => {
    service.setWhiteBlack();

    expect(service['htmlDomEl'].className).toEqual('theme-white-black');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['colorSchema']).toEqual('white-black');
  });

  it('should reduce font', () => {
    service.setReduceFont();

    expect(service['htmlDomEl'].style.fontSize).toEqual('14px');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['fontSize']).toEqual('14px');
  });

  it('should set zoom font', () => {
    service.setZoomFont();

    expect(service['htmlDomEl'].style.fontSize).toEqual('24px');
    expect(JSON.parse(localStorage.getItem('visually-impaired'))['fontSize']).toEqual('24px');
  });

  it('should reset settings', () => {
    service.resetSettings();

    expect(localStorage.getItem('visually-impaired')).toBeFalsy();
    expect(service['htmlDomEl'].style.fontSize).toEqual('14px');
    expect(service['htmlDomEl'].style.filter).toEqual('none');
  });

  it('should remove all classes from element', () => {
    service.removeClassList();

    expect(service['htmlDomEl'].classList.length).toEqual(0);
  });
});
