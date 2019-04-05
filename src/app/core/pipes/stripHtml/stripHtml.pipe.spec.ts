import { StripHtmlPipe } from './stripHtml.pipe';

describe('StriphtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new StripHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
