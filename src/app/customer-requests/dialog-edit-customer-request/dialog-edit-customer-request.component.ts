import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomerRequestsService } from 'src/app/shared/customer-requests.service';
import { ThemeService } from '../../shared/theme.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerContactsService } from 'src/app/shared/customer-contacts.service';
import { UserService } from 'src/app/shared/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { CustomerRequest } from 'src/app/models/customer-request.class';

@Component({
  selector: 'app-dialog-edit-customer-request',
  templateUrl: './dialog-edit-customer-request.component.html',
  styleUrls: ['./dialog-edit-customer-request.component.scss']
})
export class DialogEditCustomerRequestComponent implements OnInit {
  customerName: string | undefined;
  isLightTheme$!: Observable<boolean>;
  customerContacts: any = [];
  customerContactNames: any = [];
  subjectAreas = [
    'Customer Service',
    'Offer',
    'Order',
    'Sales',
    'Invoice'
  ];
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
  userDetails: any = [];
  minDate = new Date();
  dueDate = new FormControl(new Date(this.customerRequestsService.currentCustomerRequest.dueDate));
  updateCustomerRequestForm = this.formBuilder.group({
    title: [this.customerRequestsService.currentCustomerRequest.title, Validators.required],
    customerContactName: [this.customerRequestsService.currentCustomerRequest.customerContactName],
    description: [this.customerRequestsService.currentCustomerRequest.description, Validators.required],
    subjectArea: [this.customerRequestsService.currentCustomerRequest.subjectArea, Validators.required],
    priority: [this.customerRequestsService.currentCustomerRequest.priority, Validators.required],
    status: [this.customerRequestsService.currentCustomerRequest.status.replace('_', ' '), Validators.required],
    assignedToUserRef: [this.customerRequestsService.currentCustomerRequest.assignedToUserRef],
    assignedToUserName: [this.customerRequestsService.currentCustomerRequest.assignedToUserName],
    dueDate: [this.dueDate.value],
    turnover: [this.customerRequestsService.currentCustomerRequest.turnover, Validators.required],
  });


  constructor(
    public customerRequestsService: CustomerRequestsService,
    public themeService: ThemeService,
    private formBuilder: FormBuilder,
    public customerContactsService: CustomerContactsService,
    public userService: UserService,
    public dialogRef: DialogRef) { }


  /**
   * themeService.isLightTheme$ is an Observable<boolean> that is used to determine
   * getCustomerContacts() is called to get the customer contacts for the current customer
   * getUserDetails() is called to get the user details for the current user
   */
  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.getUserDetails();
    this.getCustomerContacts();
    this.updateCustomerRequestForm.get('subjectArea')?.valueChanges.subscribe(() => {
      this.showTurnover();
    });
    let comparisonDate = new Date('1970-01-01');
    if (this.dueDate.value && this.dueDate.value <= comparisonDate) {
      this.updateCustomerRequestForm.patchValue({
        dueDate: null
      });
    }
  }


  /**
   * get the user details for all user
   */
  getUserDetails() {
    this.userService.allUsers$.pipe(
      map(users => users.map(user => ({ name: `${user.firstName} ${user.lastName}`, id: user.userId })))
    ).subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }


  /**
   * get all customer contacts
   */
  getCustomerContacts() {
    this.customerContactsService.allCustomerContacts$.pipe(
      map(customerContacts => customerContacts.filter(customerContacts => customerContacts.customerRef === this.customerRequestsService.currentCustomerRequest.customerRef)))
      .subscribe(customerContacts => {
        this.customerContacts = customerContacts;
        this.customerContactNames = customerContacts.map(customerContact => (`${customerContact.firstName} ${customerContact.lastName}`));
        this.customerContactNames = this.customerContactNames.sort();
      });
  }


  /**
   * check if the subject area is 'Offer', 'Order', or 'Invoice'
   * @returns true if the subject area is 'Offer', 'Order', or 'Invoice'
   */
  showTurnover(): boolean {
    const subjectAreaValue = this.updateCustomerRequestForm.get('subjectArea')?.value;
    const validValuesForTurnover = ['Offer', 'Order', 'Invoice'];
    const showTurnover = validValuesForTurnover.includes(subjectAreaValue);
    const turnoverControl = this.updateCustomerRequestForm.get('turnover');
    if (showTurnover) {
      turnoverControl?.setValidators([Validators.required]);
    } else {
      turnoverControl?.setValidators([]);
    }
    turnoverControl?.updateValueAndValidity();
    return showTurnover;
  }


  /**
   * is called when the user clicks the "Save" button in the dialog.
   */
  async updateCustomerRequest() {
    if (this.updateCustomerRequestForm.valid) {
      const customerRequest = new CustomerRequest;
      Object.assign(customerRequest, this.updateCustomerRequestForm.value);
      this.getAssignedToUserRef(customerRequest);
      this.setCustomerRequestData(customerRequest);
      this.setDueDate(customerRequest);
      this.customerRequestsService.updateCustomerRequest(customerRequest);
      this.dialogRef.close();
    }
  }


  /**
   * get the userRef for the user that is assigned to the customer request
   * @param customerRequest is an instance of CustomerRequest
   */
  getAssignedToUserRef(customerRequest: CustomerRequest) {
    for (let i = 0; i < this.userDetails.length; i++) {
      if (this.userDetails[i].name == this.updateCustomerRequestForm.value.assignedToUserName) {
        customerRequest.assignedToUserRef = this.userDetails[i].id;
        break;
      }
    }
  }


  /**
   * set some of the customer request data
   * @param customerRequest is an instance of CustomerRequest
   */
  setCustomerRequestData(customerRequest: CustomerRequest) {
    customerRequest.customerRef = this.customerRequestsService.currentCustomerRequest.customerRef;
    customerRequest.customerContactRef = this.customerRequestsService.currentCustomerRequest.customerContactRef;
    customerRequest.customerRequestId = this.customerRequestsService.currentCustomerRequest.customerRequestId;
    customerRequest.createdBy = this.customerRequestsService.currentCustomerRequest.createdBy;
    customerRequest.dateRequested = this.customerRequestsService.currentCustomerRequest.dateRequested;
    customerRequest.status = customerRequest.status.replace(' ', '_');
    customerRequest.subjectArea = customerRequest.subjectArea.replace(' ', '_');
    customerRequest.userRef = this.customerRequestsService.currentCustomerRequest.userRef;
  }


  /**
   * set the due date for the customer request
   * @param customerRequest is an instance of CustomerRequest
   */
  setDueDate(customerRequest: CustomerRequest) {
    if (!customerRequest.dueDate) {
      customerRequest.dueDate = 0;
    } else {
      customerRequest.dueDate = this.updateCustomerRequestForm.value.dueDate?.getTime();
    }
  }
}
