import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';
import { DatabaseService } from '../database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        shortName: ['', Validators.required],
      });
    }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  saveCustomer() {

  }
}
