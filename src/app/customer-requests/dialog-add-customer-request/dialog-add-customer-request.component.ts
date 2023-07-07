import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { CustomerRequestsService } from 'src/app/shared/customer-requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';
import { CustomerRequest } from '../../models/customer-request.class';
import { CustomerService } from 'src/app/shared/customer.service';
import { CustomerContactsService } from 'src/app/shared/customer-contacts.service';

@Component({
  selector: 'app-dialog-add-customer-request',
  templateUrl: './dialog-add-customer-request.component.html',
  styleUrls: ['./dialog-add-customer-request.component.scss']
})
export class DialogAddCustomerRequestComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  newCustomerRequestForm: FormGroup;
  priorities = [
    'Low',
    'Medium',
    'High'
  ];
  statuses = [
    'pending',
    'in progress',
    'closed'
  ];
  subjectAreas = [
    'Customer Service',
    'Offer',
    'Order',
    'Sales',
    'Invoice'
  ];
  minDate = new Date();
  userDetails: any = [];
  customerContacts: any = [];
  customerContactNames: any = [];
  customerContactRef: string = '';


  constructor(
    private themeService: ThemeService,
    public customerRequestsService: CustomerRequestsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddCustomerRequestComponent>,
    public userService: UserService,
    public customerService: CustomerService,
    public customerContactsService: CustomerContactsService) {
    this.newCustomerRequestForm = this.formBuilder.group({
      subjectArea: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      customerContactName: ['', Validators.required],
      turnover: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      dateRequested: [new Date().getTime()],
      dueDate: [''],
      assignedToUserRef: [''],
      assignedToUserName: [''],
    });
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.userService.allUsers$.pipe(
      map(users => users.map(user => ({ name: `${user.firstName} ${user.lastName}`, id: user.userId })))
    ).subscribe(userDetails => {
      this.userDetails = userDetails;
    });
    this.customerContactsService.allCustomerContacts$.pipe(
      map(customerContacts => customerContacts.filter(customerContacts => customerContacts.customerRef === this.customerService.customerId)))
      .subscribe(customerContacts => {
        this.customerContacts = customerContacts;
        console.log('customerContacts ', customerContacts);
        this.customerContactNames = customerContacts.map(customerContact => (`${customerContact.firstName} ${customerContact.lastName}`));
        this.customerContactNames = this.customerContactNames.sort();
      });
    this.newCustomerRequestForm.get('subjectArea')?.valueChanges.subscribe(subjectAreaValue => {
      this.showTurnover();
    });
  }


  identifyCustomerContactId(customerContactName: string) {
    const customerContact = this.customerContacts.find((customerContact: { firstName: string; lastName: string; }) => (`${customerContact.firstName} ${customerContact.lastName}`) === customerContactName);
    this.customerContactRef = customerContact.customerContactId;
    console.log('customerContactRef ', this.customerContactRef);
  }


  showTurnover(): boolean {
    const subjectAreaValue = this.newCustomerRequestForm.get('subjectArea')?.value;
    const validValuesForTurnover = ['Offer', 'Order', 'Invoice'];
    const showTurnover = validValuesForTurnover.includes(subjectAreaValue);
    const turnoverControl = this.newCustomerRequestForm.get('turnover');
    if (showTurnover) {
      turnoverControl?.setValidators([Validators.required]);
    } else {
      turnoverControl?.setValidators([]);
    }
    turnoverControl?.updateValueAndValidity();
    return showTurnover;
  }


  async saveCustomerRequest() {
    if (this.newCustomerRequestForm.valid) {
      const newCustomerRequest = new CustomerRequest();
      Object.assign(newCustomerRequest, this.newCustomerRequestForm.value);
      newCustomerRequest.userRef = sessionStorage.getItem('userLoggedInId')!;
      newCustomerRequest.createdBy = await this.userService.getUserFullNameById(newCustomerRequest.userRef);
      if (newCustomerRequest.assignedToUserRef) {
        newCustomerRequest.assignedToUserName = await this.userService.getUserFullNameById(this.newCustomerRequestForm.value.assignedToUserRef);
      } else {
        newCustomerRequest.assignedToUserRef = '';
        newCustomerRequest.assignedToUserName = '';
      }
      newCustomerRequest.customerRef = this.customerService.customerId;
      this.identifyCustomerContactId(this.newCustomerRequestForm.value.customerContactName);
      newCustomerRequest.customerContactRef = this.customerContactRef;
      newCustomerRequest.status.replace(' ', '_');
      if (!newCustomerRequest.dueDate) {
        newCustomerRequest.dueDate = 0;
      } else {
        newCustomerRequest.dueDate = new Date(this.newCustomerRequestForm.value.dueDate).getTime();
      }
      console.log('Dies ist der neue Customer Request: ', newCustomerRequest.toJSON());
      this.customerRequestsService.saveNewCustomerRequest(newCustomerRequest);
      if (newCustomerRequest.customerRef) {
        this.customerRequestsService.getCustomerRequests(newCustomerRequest.customerRef);
      }
      this.dialogRef.close();
      console.log('new customer request saved ', newCustomerRequest.toJSON());
    } else {
      console.log('invalid form');
    }
  }
}