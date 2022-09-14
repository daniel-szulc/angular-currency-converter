import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren, ViewContainerRef
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Currency} from "./Currency";
import {CURRENCIES} from "./mock-currency";

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'currency-exchange';
  public edited = true;
  currencies = CURRENCIES;
  public selectedCurrency: Currency = CURRENCIES[0];
  @ViewChild('search_input', {static: false}) search_input;
  @ViewChild('currenciesRef', { static: true }) currenciesRef;

 // selectedCurrency: Currency = CURRENCIES[0];

  constructor(private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {
    this.selectedCurrency = CURRENCIES[0];
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
//  @Output() valueFinding;

  public findCurrency;

  public valueFinding() {

    console.log(CURRENCIES[0].name);
    console.log(this.findCurrency);
    this.currencies = CURRENCIES.filter(item => item.name.toLowerCase().includes(this.findCurrency.toLowerCase()) || item.full_name.toLowerCase().includes(this.findCurrency.toLowerCase()));
    console.log(this.currencies);

  }

 selectCurrency = (currency: Currency): void =>{
   this.selectedCurrency = currency;
 }

  dropClick(){
    this.edited = false;
    this.changeDetector.detectChanges();
    this.search_input.nativeElement.focus();
  }
  deselectSearch(){
    this.edited = true;
  }

  ngOnInit(): void {
   // this.viewContainerRef.createEmbeddedView(this.currenciesRef);
  }

  ngAfterViewInit(): void {
  }
}
