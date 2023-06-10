import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../../shared/theme.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  isLightTheme: boolean = false;
  @ViewChild('searchInput') searchInput: ElementRef | undefined;
  filteredCustomers: any = [];


  constructor(
    public dialog: MatDialog, 
    public themeService: ThemeService,
    public databaseservice: DatabaseService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.databaseservice.allCustomers.subscribe(customers => {
      console.log('customers ', customers);
      this.filteredCustomers = customers;
    });
  }


  searchCustomer() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.filteredCustomers = this.databaseservice.allCustomers$.value.filter((customer: any) => {
      return (customer.name.toLowerCase().includes(searchTerm) ||
        customer.street.toLowerCase().includes(searchTerm) ||
        customer.zipCode.toLowerCase().includes(searchTerm) ||
        customer.city.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm) ||
        customer.homepage.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm));
    });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}
