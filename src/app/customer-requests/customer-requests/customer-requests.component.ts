import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { DialogAddCustomerRequestComponent } from '../dialog-add-customer-request/dialog-add-customer-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.scss']
})
export class CustomerRequestsComponent implements OnInit {
  @Input() customerId = '';
  isLightTheme: boolean = false;


  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerRequestComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });    
  }
}
