import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../../shared/theme.service';
import { Customer } from '../../models/customer.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  updateCustomerForm = this.formBuilder.group({
    name: [this.customerService.customer.name, Validators.required],
    street: [this.customerService.customer.street, Validators.required],
    zipCode: [this.customerService.customer.zipCode, Validators.required],
    city: [this.customerService.customer.city, Validators.required],
    phone: [this.customerService.customer.phone, Validators.required],
    homepage: [this.customerService.customer.homepage],
    email: [this.customerService.customer.email, [Validators.required, Validators.email]],
  });


  constructor(
    public customerService: CustomerService,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditCustomerComponent>) { }


  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomer() {
    if (this.updateCustomerForm.valid) {
      const customer = new Customer();
      Object.assign(customer, this.updateCustomerForm.value);
      this.customerService.updateCustomer(customer);
      this.dialogRef.close();
    }
  }
}