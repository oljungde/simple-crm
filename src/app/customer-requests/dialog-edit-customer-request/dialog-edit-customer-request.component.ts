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
    customerContactName: [this.customerRequestsService.currentCustomerRequest.customerContactName, Validators.required],
    description: [this.customerRequestsService.currentCustomerRequest.description, Validators.required],
    subjectArea: [this.customerRequestsService.currentCustomerRequest.subjectArea, Validators.required],
    priority: [this.customerRequestsService.currentCustomerRequest.priority, Validators.required],
    status: [this.customerRequestsService.currentCustomerRequest.status, Validators.required],
    assignedToUserRef: [this.customerRequestsService.currentCustomerRequest.assignedToUserRef, Validators.required],
    assignedToUserName: [this.customerRequestsService.currentCustomerRequest.assignedToUserName, Validators.required],
    dueDate: [this.dueDate.value, Validators.required],
    turnover: [this.customerRequestsService.currentCustomerRequest.turnover, Validators.required],
  });


  constructor(
    public customerRequestsService: CustomerRequestsService,
    public themeService: ThemeService,
    private formBuilder: FormBuilder,
    public customerContactsService: CustomerContactsService,
    public userService: UserService,
    public dialogRef: DialogRef) { }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.userService.allUsers$.pipe(
      map(users => users.map(user => ({ name: `${user.firstName} ${user.lastName}`, id: user.userId })))
    ).subscribe(userDetails => {
      this.userDetails = userDetails;
    });
    console.log('UserDetails are: ', this.userDetails);
    this.customerContactsService.allCustomerContacts$.pipe(
      map(customerContacts => customerContacts.filter(customerContacts => customerContacts.customerRef === this.customerRequestsService.currentCustomerRequest.customerRef)))
      .subscribe(customerContacts => {
        this.customerContacts = customerContacts;
        console.log('customerContacts ', customerContacts);
        this.customerContactNames = customerContacts.map(customerContact => (`${customerContact.firstName} ${customerContact.lastName}`));
        this.customerContactNames = this.customerContactNames.sort();
      });
    this.updateCustomerRequestForm.get('subjectArea')?.valueChanges.subscribe(subjectAreaValue => {
      this.showTurnover();
    });
  }


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


  async updateCustomerRequest() {
    console.log('Save btn pushed');
    if (this.updateCustomerRequestForm.valid) {
      // debugger;
      const customerRequest = new CustomerRequest;
      console.log('CustomerRequest: ', customerRequest);

      Object.assign(customerRequest, this.updateCustomerRequestForm.value);
      console.log('Assigned to user Ref: ', this.updateCustomerRequestForm.value.assignedToUserRef);

      customerRequest.assignedToUserName = await this.userService.getUserFullNameById(this.updateCustomerRequestForm.value.assignedToUserRef);
      console.log('Assigned to user name: ', customerRequest.assignedToUserName);

      customerRequest.customerRef = this.customerRequestsService.currentCustomerRequest.customerRef;
      customerRequest.customerContactRef = this.customerRequestsService.currentCustomerRequest.customerContactRef;
      customerRequest.customerRequestId = this.customerRequestsService.currentCustomerRequest.customerRequestId;
      customerRequest.createdBy = this.customerRequestsService.currentCustomerRequest.createdBy;
      customerRequest.dateRequested = this.customerRequestsService.currentCustomerRequest.dateRequested;
      customerRequest.dueDate = this.updateCustomerRequestForm.value.dueDate?.getTime();
      customerRequest.userRef = this.customerRequestsService.currentCustomerRequest.userRef;
      this.customerRequestsService.updateCustomerRequest(customerRequest);
      this.dialogRef.close();
    }
  }
}
