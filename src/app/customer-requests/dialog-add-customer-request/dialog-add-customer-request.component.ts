import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { CustomerRequestsService } from 'src/app/shared/customer-requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
  minDate = new Date();


  constructor(
    private themeService: ThemeService,
    public customerRequestsService: CustomerRequestsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddCustomerRequestComponent>
  ) { 
    this.newCustomerRequestForm = this.formBuilder.group({
      subjectArea: ['', Validators.required], // d
      title: ['', Validators.required], // d
      description: ['', Validators.required], // d
      priority: ['', Validators.required], // d
      status: ['', Validators.required], // d
      dateRequested: this.getCurrentDate(), //D
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required] //D
    });
  }


  getCurrentDate() {
    return new Date().toISOString().substring(0, 10)+ ' - ' + new Date().toISOString().substring(11, 16);
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;    
  }


  saveCustomerRequest() {

  }
}