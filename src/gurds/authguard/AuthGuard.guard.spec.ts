import { AuthGuard } from './AuthGuard.guard';

describe('AuthguardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
