import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CURRENCIES} from "../mock-currency";
import {Currency} from "../Currency";


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['../../styles/default.scss','./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {

  public edited = true;
  @Input() changeCurrency;
  @Input() selectorId;

  currencies = CURRENCIES;
  public selectedCurrency: Currency = CURRENCIES[0];
  public elementCurrenciesList;
  public findCurrency;
  public ignoreFocusOut=false;

  @ViewChild('search_input', {static: false}) search_input;

  constructor(private changeDetector: ChangeDetectorRef) {

  }



  public valueFinding() {
    this.currencies = CURRENCIES.filter(item => item.name.toLowerCase().includes(this.findCurrency.toLowerCase()) || item.full_name.toLowerCase().includes(this.findCurrency.toLowerCase()));
  }




  selectCurrency = (currency: Currency): void =>{
    console.log("currency");
    this.selectedCurrency = currency;
    this.HideDropdown();
    this.changeCurrency(currency);
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

  ngAfterViewInit(): void{
    this.elementCurrenciesList = document.getElementById('currenciesList ' + this.selectorId)
    console.log(this.elementCurrenciesList);
    this.selectCurrency(CURRENCIES[0]);
  }

  ngOnInit(): void {

  }




}
