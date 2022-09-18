import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
/*import {CURRENCIES} from "../mock-currency";*/
import {Currency} from "../Currency";
import {CurrencyServiceComponent} from "../currency-service/currency-service.component";


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['../../styles/default.scss','./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {

  public edited = true;
  @Input() changeCurrency;
  @Input() selectorId;

  currencies;

  public selectedCurrency;
  public elementCurrenciesList;
  public findCurrency;
  public ignoreFocusOut=false;
  public noResultsFind = false;
  @ViewChild('search_input', {static: false}) search_input;

  constructor(private changeDetector: ChangeDetectorRef,  public service: CurrencyServiceComponent) {

  }



  public valueFinding() {

    this.currencies=this.service.getCurrencies().filter(item =>
      item.name.toLowerCase().includes(this.findCurrency.toLowerCase())
      || item.full_name.toLowerCase().includes(this.findCurrency.toLowerCase())
    );

    this.noResultsFind = this.currencies.length == 0;
  }


  selectCurrency = (currency: Currency): void =>{
    this.selectedCurrency = currency;
    this.changeCurrency(currency);
    this.HideDropdown();

    localStorage.setItem(this.selectorId, currency.name);
  }

  ShowDropdown()
  {
    console.log("showDropdown");
    this.edited = false;
     this.elementCurrenciesList.className = "dropdown-menu scrollable-menu show";
  }

  HideDropdown()
  {
    console.log("hideDropdown");
   this.edited = true;
   this.elementCurrenciesList.className = "dropdown-menu scrollable-menu";
  }


  dropClick(){
    this.findCurrency="";
    this.ShowDropdown();
    this.changeDetector.detectChanges();
    this.search_input.nativeElement.focus();
    this.valueFinding();
  }

  focusOutInput(){
    if(!this.ignoreFocusOut)
      this.HideDropdown();
  }

  private selectCurrencyOnStart(){
    let data
    let localData = localStorage.getItem(this.selectorId);
    if(localData)
      data = this.service.getCurrencies().find(element => element.name==localData);
    if(!data)
      data = this.service.getCurrencies().find(element => element.name==(this.selectorId == 'from' ? 'EUR' : 'USD'));
    if(data)
    this.selectCurrency(data);
  }

  ngAfterViewInit(): void{

    this.elementCurrenciesList = document.getElementById('currenciesList ' + this.selectorId)
    this.selectCurrencyOnStart();

  }

  ngOnInit(): void {
    this.currencies = this.service.getCurrencies();

    this.selectedCurrency = this.service.getCurrencies()[0];
    this.changeCurrency(this.service.getCurrencies()[0]);

  }




}
