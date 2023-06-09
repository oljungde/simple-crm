import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerContactComponent } from '../dialog-add-customer-contact/dialog-add-customer-contact.component';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements OnInit {
  isLightTheme: boolean = false;
  @Input() customerId = '';
  customerContacts: any = [];
  

  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public databaseService: DatabaseService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    console.log('customerId:', this.customerId);
    this.databaseService.getCustomerContacts(this.customerId); 
  }


  openDialog(isLightTheme: boolean) {
    const dialogRef = this.dialog.open(DialogAddCustomerContactComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    }); 
    dialogRef.componentInstance.customerRef = this.customerId;
  }

  searchContact() {
    
  }
}