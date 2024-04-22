import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GlobalService } from '../../shares/services/global.service';
import { CommonModule } from '@angular/common';
import { Option } from '../../shares/interfaces/option.interface';
import { Config } from '../../shares/interfaces/config.interface';
import { Subscription } from 'rxjs';
import { AditionalOption } from '../../shares/interfaces/aditional-option';

@Component({
  selector: 'app-config-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-option.component.html',
  styleUrl: './config-option.component.scss',
})
export class ConfigOptionComponent implements OnInit, OnDestroy {
  codeModel: string = '';
  options$ = this.globalService.options$;
  option?: Option;
  activedConfig?: Config | null;
  price?: number = 0;
  subscription: Subscription = new Subscription();
  aditionalOption: AditionalOption = this.globalService.aditionalOption;

  constructor(
    private activedRoute: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.codeModel = paramMap.get('modelCode')!;
    });
    this.subscription.add(
      this.globalService
        .getOptions(this.codeModel)
        .subscribe((option: Option) => {
          this.option = option;
        })
    );

    this.subscription.add(
      this.globalService.activedOption$.subscribe(
        (internalConfig: Config | null) => {
          this.activedConfig = internalConfig;
        }
      )
    );
  }
  selectedOption(idConfig: string) {
    this.globalService.selectedOption(+idConfig);
  }

  towHitchClick(event: string) {
    this.globalService.setAditionalOptionTowHitch(event ? true : false);
  }

  yokeClick(event: string) {
    this.globalService.setAditionalOptionYoke(event ? true : false);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
