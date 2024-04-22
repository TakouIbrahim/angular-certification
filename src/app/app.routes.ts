import { Routes } from '@angular/router';
import { ModelColorComponent } from './compoment/model-color/model-color.component';
import { ConfigOptionComponent } from './compoment/config-option/config-option.component';
import { RecapitulationComponent } from './compoment/recapitulation/recapitulation.component';
import { configGuard } from './shares/guards/config.guard';
import { resultGuard } from './shares/guards/result.guard';

export const routes: Routes = [
  { path: '', component: ModelColorComponent, pathMatch: 'full' },
  {
    path: 'options/:modelCode',
    component: ConfigOptionComponent,
    canActivate: [configGuard],
  },
  {
    path: 'result',
    component: RecapitulationComponent,
    canActivate: [resultGuard],
  },
];
