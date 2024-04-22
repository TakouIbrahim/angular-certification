import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { GlobalService } from '../services/global.service';

export const configGuard: CanActivateFn = (route, state) => {
  const globalService = inject(GlobalService);
  return globalService.isActiveModel();
};
