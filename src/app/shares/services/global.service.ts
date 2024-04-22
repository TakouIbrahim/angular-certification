import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Option } from '../interfaces/option.interface';
import { Config } from '../interfaces/config.interface';
import { Model } from '../interfaces/model.interface';
import { AditionalOption } from '../interfaces/aditional-option';
import { Color } from '../interfaces/color.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService implements OnDestroy {
  subscription: Subscription = new Subscription();
  model$: BehaviorSubject<Model[]> = new BehaviorSubject([
    {
      code: '',
      description: '',
      colors: [
        {
          code: '',
          description: '',
          price: NaN,
        },
      ],
    },
  ]);

  options$: BehaviorSubject<Option> = new BehaviorSubject<Option>({
    configs: [
      {
        id: NaN,
        description: '',
        range: NaN,
        speed: NaN,
        price: NaN,
      },
    ],
    towHitch: false,
    yoke: false,
  });
  aditionalOption: AditionalOption = {
    color: { code: '', description: '', price: NaN },
    towHitch: false,
    yoke: false,
  };
  private activedModelSubject = new BehaviorSubject<Model | null>(null);
  activedModel$: Observable<Model | null> =
    this.activedModelSubject.asObservable();

  private activedOptionSubject = new BehaviorSubject<Config | null>(null);
  activedOption$: Observable<Config | null> =
    this.activedOptionSubject.asObservable();

  constructor(private http: HttpClient) {}

  getModel(): Observable<Model[]> {
    return this.http.get<Model[]>('/models').pipe(
      tap((models: Model[]) => {
        return this.model$.next(models);
      })
    );
  }
  getOptions(codeModel: string): Observable<Option> {
    return this.http.get<Option>(`/options/${codeModel}`).pipe(
      tap((options: Option) => {
        this.options$.next(options);
      })
    );
  }

  selectedModel(code: string): void {
    if (code) {
      this.subscription.add(
        this.model$.subscribe((models: Model[]) => {
          const activedModel = models.find(
            (model: Model) => model.code === code
          );
          this.activedModelSubject.next(activedModel!);
        })
      );
    } else {
      this.activedModelSubject.next(null);
    }
  }
  selectedOption(id: number) {
    this.subscription.add(
      this.options$.subscribe((option: Option) => {
        const internalOption = option.configs.find(
          (config: Config) => config.id === id
        );
        this.activedOptionSubject.next(internalOption!);
      })
    );
  }

  isActiveModel(): boolean {
    let response = false;
    this.activedModel$.subscribe((model: Model | null) => {
      model ? (response = true) : (response = false);
    });
    return response;
  }
  isActiveOption(): boolean {
    let response = false;
    this.activedOption$.subscribe((config: Config | null) => {
      config ? (response = true) : (response = false);
    });
    return response;
  }

  setAditionalOptionColor(colorr: Color) {
    this.aditionalOption.color = colorr;
  }

  setAditionalOptionTowHitch(towHitch: boolean) {
    this.aditionalOption.towHitch = towHitch;
  }

  setAditionalOptionYoke(yoke: boolean) {
    this.aditionalOption.yoke = yoke;
  }
  initAditionalOption() {
    this.aditionalOption = {
      color: { code: '', description: '', price: NaN },
      towHitch: false,
      yoke: false,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
