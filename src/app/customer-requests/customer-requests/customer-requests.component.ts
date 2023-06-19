import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { DialogAddCustomerRequestComponent } from '../dialog-add-customer-request/dialog-add-customer-request.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRequestsService } from '../../shared/customer-requests.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.scss']
})
export class CustomerRequestsComponent implements OnInit {
  isLightTheme: boolean = false;
  @Input() customerId = '';
  customerRequests: any = [];


  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public customerRequestsService: CustomerRequestsService
  ) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerRequestsService.getCustomerRequests(this.customerId)
      .subscribe(data => {
        this.customerRequests = data;
        console.log('Diese Kundenanfragen', this.customerRequests);
      });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerRequestComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });    
  }
}