import { PerformanceDurationPipe } from './performance-duration.pipe';

describe('PerformanceDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new PerformanceDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
