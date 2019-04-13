import { StripNbspPipe } from './strip-nbsp.pipe';

describe('StripNbspPipe', () => {
  it('create an instance', () => {
    const pipe = new StripNbspPipe();
    expect(pipe).toBeTruthy();
  });
});
