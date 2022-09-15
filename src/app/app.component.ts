import {
  AfterViewInit, ChangeDetectorRef,
  Component,

  OnInit,
  ViewChild,
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

  private _from=CURRENCIES[0];
  private to=CURRENCIES[1];
  public amount_value;
  @ViewChild('from') fromCmp;
  @ViewChild('to') toCmp;
  @ViewChild('amount_input', {static: false}) amount_input;
  @ViewChild('submitBtn', {static: false}) submitBtn;
  @ViewChild('formExchange', {static: false}) formExchange;
  get from_symbol() {
    return this._from.symbol;
  }
 // selectedCurrency: Currency = CURRENCIES[0];

  constructor(private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {

  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public selectFrom = (currency: Currency): void =>{
    this._from=currency;

  }

  public selectTo = (currency: Currency): void =>{
    this.to=currency;
  }

  public focusOutInput(){
    this.amount_value = (Math.round( this.amount_value * 100) / 100).toFixed(2);
  }

  public switchCurrencies(){
    console.log("HELLO")
    let temp : Currency = this._from;
    console.log(temp);
    console.log(this.to);
    this.fromCmp.selectCurrency(this.to);

    this.toCmp.selectCurrency(temp);
  }

  ngOnInit(): void {
    this.amount_value=(1).toFixed(2);
  }

  windowResize(): void{
    this.submitBtn.nativeElement.style.width = this.formExchange.nativeElement.style.width;
  }

  ngAfterViewInit(): void {
  }
}
