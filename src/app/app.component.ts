import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GlobalService } from './shares/services/global.service';
import { Subscription } from 'rxjs';
import { Model } from './shares/interfaces/model.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  subscription: Subscription = new Subscription();
  codeModel? = '';

  constructor(private globalService: GlobalService, private router: Router) {}

  goConfig() {
    this.globalService.activedModel$.subscribe((model: Model | null) => {
      this.codeModel = model?.code;
    });
    this.router.navigateByUrl(`/options/${this.codeModel}`);
  }
}
