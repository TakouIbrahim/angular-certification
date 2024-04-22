import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, take, tap } from 'rxjs';
import { GlobalService } from '../../shares/services/global.service';
import { Model } from '../../shares/interfaces/model.interface';
import { CommonModule } from '@angular/common';
import { Color } from '../../shares/interfaces/color.interface';
import { AditionalOption } from '../../shares/interfaces/aditional-option';

@Component({
  selector: 'app-model-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-color.component.html',
  styleUrl: './model-color.component.scss',
})
export class ModelColorComponent implements OnInit, OnDestroy {
  subscription?: Subscription = new Subscription();

  models$: Observable<Model[]> = this.globalService.model$;
  activedModel?: Model | null;
  imgUrl: string = '';
  aditionalOption: AditionalOption = this.globalService.aditionalOption;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.subscription?.add(this.globalService.getModel().subscribe());

    this.subscription?.add(
      this.globalService.activedModel$.subscribe(
        (activedModel: Model | null) => {
          this.activedModel = activedModel;
        }
      )
    );
    if (this.activedModel) {
      this.imgUrl = `https://interstate21.com/tesla-app/images/${this.activedModel?.code}/${this.aditionalOption.color?.code}.jpg`;
    } else {
      this.imgUrl = `assets/img/default.jpg`;
    }
  }

  selectedModel(code: string): void {
    this.globalService.selectedModel(code);
    this.globalService.initAditionalOption();

    if (code) {
      this.globalService.setAditionalOptionColor(this.activedModel?.colors[0]!);
      this.imgUrl = `https://interstate21.com/tesla-app/images/${this.activedModel?.code}/${this.activedModel?.colors[0].code}.jpg`;
    } else {
      this.imgUrl = 'assets/img/default.jpg';
    }
  }

  selectedColor(color: string): void {
    const c: Color | undefined = this.activedModel?.colors.find(
      (col: Color) => col.code === color
    );
    this.globalService.setAditionalOptionColor(c!);

    this.imgUrl = `https://interstate21.com/tesla-app/images/${this.activedModel?.code}/${color}.jpg`;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
