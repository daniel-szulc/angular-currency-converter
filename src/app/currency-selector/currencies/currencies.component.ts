import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['../currency-selector.component.scss']
})
export class CurrenciesComponent{

  @Input() selectCurrency;
  @Input() currency;


  public selectCurrencyFunc(currency){
    console.log(currency);
    this.selectCurrency(currency);
  }

}
