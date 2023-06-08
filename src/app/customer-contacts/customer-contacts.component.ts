import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements OnInit {
  isLightTheme: boolean = false;
  @Input() customerId = '';
  

  constructor(public themeService: ThemeService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
  }


  openDialog(isLightTheme: boolean, customerId: string) {
    console.log('openDialog customerId: ', customerId);
    
  }
}