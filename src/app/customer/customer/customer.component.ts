import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../../shared/theme.service';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { CustomerService } from '../../shared/customer.service';

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
    public customerService: CustomerService) { }


  /**
   * get all customers and subscribe to theme changes
   */
  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerService.allCustomers.subscribe(customers => {
      this.filteredCustomers = customers;
    });
  }


  /**
   * Search for customers by name, street, zipCode, city, phone, homepage, email
   */
  searchCustomer() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.filteredCustomers = this.customerService.allCustomers$.value.filter((customer: any) => {
      return (customer.name.toLowerCase().includes(searchTerm) ||
        customer.street.toLowerCase().includes(searchTerm) ||
        customer.zipCode.toLowerCase().includes(searchTerm) ||
        customer.city.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm) ||
        customer.homepage.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm));
    });
  }


  /**
   * open dialog to add a new customer
   * @param isLightTheme checks if the theme is light or dark
   */
  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}