import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '../../shares/services/global.service';
import { Subscription } from 'rxjs';
import { Model } from '../../shares/interfaces/model.interface';
import { Config } from '../../shares/interfaces/config.interface';
import { AditionalOption } from '../../shares/interfaces/aditional-option';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recapitulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recapitulation.component.html',
  styleUrl: './recapitulation.component.scss',
})
export class RecapitulationComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  activedModel?: Model | null;
  activedConfig?: Config | null;
  aditionalOption: AditionalOption = this.globalService.aditionalOption!;

  imgUrl: string = '';
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.subscription?.add(
      this.globalService.activedModel$.subscribe(
        (activedModel: Model | null) => {
          this.activedModel = activedModel;
        }
      )
    );
    this.subscription.add(
      this.globalService.activedOption$.subscribe(
        (activedConfig: Config | null) => {
          this.activedConfig = activedConfig;
          this.imgUrl = `https://interstate21.com/tesla-app/images/${this.activedModel?.code}/${this.aditionalOption.color?.code}.jpg`;
        }
      )
    );
  }
  get totalPrice(): number {
    let total = this.activedConfig!.price + this.aditionalOption.color!.price;
    total += this.aditionalOption.towHitch ? 1000 : 0;
    total += this.aditionalOption.yoke ? 1000 : 0;
    return total;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
