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
  userNames: any = [];
  minDate = new Date();
  dueDate = new FormControl(new Date(this.customerRequestsService.currentCustomerRequest.dueDate));  
  updateCustomerRequestForm = this.formBuilder.group({
    title: [this.customerRequestsService.currentCustomerRequest.title, Validators.required],
    customerContactName: [this.customerRequestsService.currentCustomerRequest.customerContactName, Validators.required],
    description: [this.customerRequestsService.currentCustomerRequest.description, Validators.required],
    subjectArea: [this.customerRequestsService.currentCustomerRequest.subjectArea, Validators.required],
    priority: [this.customerRequestsService.currentCustomerRequest.priority, Validators.required],
    status: [this.customerRequestsService.currentCustomerRequest.status, Validators.required],
    assignedTo: [this.customerRequestsService.currentCustomerRequest.assignedTo, Validators.required],
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
        map(users => users.map(user => (`${user.firstName} ${user.lastName}`)))
      ).subscribe(userNames => {
        this.userNames = userNames;
      });
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
      console.log('Timestamp is',new Date(this.customerRequestsService.currentCustomerRequest.dueDate).getTime());
      console.log(this.dueDate.value);
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


    updateCustomerRequest() {
      console.log('Save btn pushed');
      if (this.updateCustomerRequestForm.valid) {
        const customerRequest = new CustomerRequest;
        Object.assign(customerRequest, this.updateCustomerRequestForm.value);
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
