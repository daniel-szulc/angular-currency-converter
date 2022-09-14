import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Currency} from "../Currency";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
})
export class CurrenciesComponent{

  @Input() selectCurrency; //: (currency: Currency) => void;
  @Input() currency;


  selectCurrencyFunc(currency:Currency){
    this.selectCurrency(currency);
  }

}
