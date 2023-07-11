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
      customerContactName: [''],
      turnover: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      dateRequested: [new Date().getTime()],
      dueDate: [''],
      assignedToUserRef: [''],
      assignedToUserName: [''],
    });
  }


  /**
   * subscribe to theme changes and get all users and customer contacts
   */
  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.userService.allUsers$.pipe(
      map(users => users.map(user => ({ name: `${user.firstName} ${user.lastName}`, id: user.userId })))
    ).subscribe(userDetails => {
      this.userDetails = userDetails;
    });
    this.getCustomerContactsFullNames();
    this.newCustomerRequestForm.get('subjectArea')?.valueChanges.subscribe(subjectAreaValue => {
      this.showTurnover();
    });
  }


  /**
   * get all customer contacts and their full names
   */
  getCustomerContactsFullNames() {
    this.customerContactsService.allCustomerContacts$.pipe(
      map(customerContacts => customerContacts.filter(customerContacts => customerContacts.customerRef === this.customerService.customerId)))
      .subscribe(customerContacts => {
        this.customerContacts = customerContacts;
        this.customerContactNames = customerContacts.map(customerContact => (`${customerContact.firstName} ${customerContact.lastName}`));
        this.customerContactNames = this.customerContactNames.sort();
      });
  }


  /**
   * get customer contact id by customer contact name
   * @param customerContactName name of the customer contact to identify the customer contact id
   */
  identifyCustomerContactId(customerContactName: string) {
    const customerContact = this.customerContacts.find((customerContact: { firstName: string; lastName: string; }) => (`${customerContact.firstName} ${customerContact.lastName}`) === customerContactName);
    this.customerContactRef = customerContact.customerContactId;
  }


  /**
   * show turnover field if subject area is 'Offer', 'Order' or 'Invoice'
   * @returns true if subject area is 'Offer', 'Order' or 'Invoice' and false if subject area is 'Customer Service' or 'Sales'
   */
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


  /**
   * save new customer request
   */
  async saveCustomerRequest() {
    if (this.newCustomerRequestForm.valid) {
      const newCustomerRequest = new CustomerRequest();
      Object.assign(newCustomerRequest, this.newCustomerRequestForm.value);
      await this.setCustomerRequestData(newCustomerRequest);
      await this.setAssignedTo(newCustomerRequest)
      if (newCustomerRequest.customerContactName) {
        this.identifyCustomerContactId(this.newCustomerRequestForm.value.customerContactName);
      }
      this.setDueDate(newCustomerRequest);
      this.customerRequestsService.saveNewCustomerRequest(newCustomerRequest);
      if (newCustomerRequest.customerRef) {
        this.customerRequestsService.getCustomerRequests(newCustomerRequest.customerRef);
      }
      this.dialogRef.close();
    } else {
      console.log('invalid form');
    }
  }


  /**
   * set customer request data before saving
   * @param newCustomerRequest instance of CustomerRequest class
   */
  async setCustomerRequestData(newCustomerRequest: CustomerRequest) {
    newCustomerRequest.userRef = sessionStorage.getItem('userLoggedInId')!;
    newCustomerRequest.createdBy = await this.userService.getUserFullNameById(newCustomerRequest.userRef);
    newCustomerRequest.customerContactRef = this.customerContactRef;
    newCustomerRequest.status = newCustomerRequest.status.replace(' ', '_');
    newCustomerRequest.subjectArea = newCustomerRequest.subjectArea.replace(' ', '_');
    newCustomerRequest.customerRef = this.customerService.customerId;
  }


  /**
   * set assigned to user name and user ref before saving
   * @param newCustomerRequest instance of CustomerRequest class
   */
  async setAssignedTo(newCustomerRequest: CustomerRequest) {
    if (newCustomerRequest.assignedToUserRef) {
      newCustomerRequest.assignedToUserName = await this.userService.getUserFullNameById(this.newCustomerRequestForm.value.assignedToUserRef);
    } else {
      newCustomerRequest.assignedToUserRef = '';
      newCustomerRequest.assignedToUserName = '';
    }
  }


  /**
   * set due date before saving
   * @param newCustomerRequest instance of CustomerRequest class
   */
  setDueDate(newCustomerRequest: CustomerRequest) {
    if (!newCustomerRequest.dueDate) {
      newCustomerRequest.dueDate = 0;
    } else {
      newCustomerRequest.dueDate = new Date(this.newCustomerRequestForm.value.dueDate).getTime();
    }
  }
}