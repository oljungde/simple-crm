import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { DatabaseService } from '../database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../models/customer.class';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  newCustomerForm: FormGroup;


  constructor(
    private themeService: ThemeService,
    public databaseService: DatabaseService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>) {
      this.newCustomerForm = this.formBuilder.group({
        name: ['', Validators.required],
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
        homepage: [''],
        email: ['', [Validators.required, Validators.email]],
      });
    }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomer() {
    if (this.newCustomerForm.valid) {
      const newCustomer = new Customer();
      Object.assign(newCustomer, this.newCustomerForm.value);
      this.databaseService.saveNewCustomer(newCustomer);
      this.dialogRef.close();
      console.log('new customer saved ', newCustomer);
    } else {
      console.log('invalid form');
    }
    
  }
}