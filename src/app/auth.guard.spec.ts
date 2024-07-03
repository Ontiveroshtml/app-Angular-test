import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  const executeGuard: CanActivateFn = (...guardParameters) => {
    return TestBed.runInInjectionContext(() => guard.canActivate(...guardParameters));
  };

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should execute guard', () => {
    expect(executeGuard).toBeTruthy();
  });
});
