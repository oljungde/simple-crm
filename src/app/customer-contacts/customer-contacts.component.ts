import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerContactComponent } from '../dialog-add-customer-contact/dialog-add-customer-contact.component';
import { DatabaseService } from '../shared/database.service';
import { DialogEditCustomerContactComponent } from '../dialog-edit-customer-contact/dialog-edit-customer-contact.component';


@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements OnInit {
  isLightTheme: boolean = false;
  @Input() customerId = '';
  customerContacts: any = [];
  @ViewChild('searchInput') searchInput: ElementRef | undefined;
  

  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public databaseService: DatabaseService) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    console.log('customerId:', this.customerId);

    this.databaseService.getCustomerContacts(this.customerId)
      .subscribe(data => {
        this.customerContacts = data;
        console.log('Diese Kundenkontakte', this.customerContacts);
      });

    // this.databaseService.getCustomerContacts(this.customerId)
    // .then((customerContacts: any) => {
    //   this.customerContacts = this.databaseService.customerContacts;
    //   console.log('customerContacts:', this.customerContacts);      
    //   }); 
  }


  openDialogAddContact(isLightTheme: boolean) {
    const dialogRef = this.dialog.open(DialogAddCustomerContactComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    }); 
    dialogRef.componentInstance.customerRef = this.customerId;
  }


  searchContact() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.customerContacts = this.databaseService.customerContacts.filter((contact: any) => {
      return (contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm) ||
        contact.position.toLowerCase().includes(searchTerm));
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