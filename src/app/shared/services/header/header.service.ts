import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { headerOptionsEnum } from '../../helpers/Enums/headerOptionsEnum';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerOption = new BehaviorSubject<headerOptionsEnum>(headerOptionsEnum.site);

  get headerOption(): headerOptionsEnum {
    return this._headerOption.value;
  }
  set headerOption(value: headerOptionsEnum) {
    this._headerOption.next(value);
  }

  constructor() { }
}
