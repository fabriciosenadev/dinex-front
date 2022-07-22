import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderOptionsEnum } from '../../helpers/Enums/headerOptionsEnum';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerOption = new BehaviorSubject<HeaderOptionsEnum>(HeaderOptionsEnum.site);

  get headerOption(): HeaderOptionsEnum {
    return this._headerOption.value;
  }
  set headerOption(value: HeaderOptionsEnum) {
    this._headerOption.next(value);
  }

  constructor() { }
}
