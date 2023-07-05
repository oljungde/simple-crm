import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerContactComponent } from '../dialog-add-customer-contact/dialog-add-customer-contact.component';
import { CustomerContactsService } from '../../shared/customer-contacts.service';
import { DialogEditCustomerContactComponent } from '../dialog-edit-customer-contact/dialog-edit-customer-contact.component';
import { map } from 'rxjs';


@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements OnInit {
  isLightTheme: boolean = false;
  panelOpenState = false;
  @Input() customerId = '';
  customerContacts: any = [];
  @ViewChild('searchInput') searchInput: ElementRef | undefined;


  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public customerContactsService: CustomerContactsService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    console.log('customerId:', this.customerId);

    this.customerContactsService.getCustomerContacts(this.customerId)
      .subscribe(data => {
        this.customerContacts = data;
        console.log('Diese Kundenkontakte', this.customerContacts);
      });
  }


  openDialogAddContact(isLightTheme: boolean) {
    const dialogRef = this.dialog.open(DialogAddCustomerContactComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
    dialogRef.componentInstance.customerRef = this.customerId;
  }


  searchContact() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.customerContactsService.getCustomerContacts(this.customerId).pipe(
      map((data: any) => {
        return Array.isArray(data) ? data : [];
      })
    ).subscribe((data: any) => {
      this.customerContacts = data.filter((contact: any) => {
        return (contact.firstName.toLowerCase().includes(searchTerm) ||
          contact.lastName.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm) ||
          contact.phone.toLowerCase().includes(searchTerm) ||
          contact.position.toLowerCase().includes(searchTerm));
      });
    });
  }


  openDialogEditContact(isLightTheme: boolean, contactId: any) {
    console.log('edit contact:', contactId);
    let contact = this.customerContacts.find((contact: any) => contact.customerContactId === contactId);
    console.log('contact:', contact);
    const dialog = this.dialog.open(DialogEditCustomerContactComponent);
    dialog.componentInstance.customerContact = contact;
  }
}