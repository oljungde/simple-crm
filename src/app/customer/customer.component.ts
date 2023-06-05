import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../theme.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  isLightTheme: boolean = false;


  constructor(public dialog: MatDialog, public themeService: ThemeService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}
