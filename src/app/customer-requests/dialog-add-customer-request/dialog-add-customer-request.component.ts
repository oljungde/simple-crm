import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ThemeService } from '../../shared/theme.service';
import { CustomerRequestsService } from 'src/app/shared/customer-requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';

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
  userNames: any = [];


  constructor(
  private themeService: ThemeService,
  public customerRequestsService: CustomerRequestsService,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<DialogAddCustomerRequestComponent>,
  public userService: UserService) { 
    this.newCustomerRequestForm = this.formBuilder.group({
      subjectArea: ['', Validators.required], 
      title: ['', Validators.required], 
      description: ['', Validators.required], 
      priority: ['', Validators.required],
      status: ['', Validators.required], 
      dateRequested: this.getCurrentDate(),
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required] 
    });
  }


  getCurrentDate() {
    return new Date().toISOString().substring(0, 10)+ ' - ' + new Date().toISOString().substring(11, 16);
  }


  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
    this.userService.allUsers$.pipe(
      map(users => users.map(user => (`${user.firstName} ${user.lastName}`)))
    ).subscribe(userNames => {
      this.userNames = userNames;
    });
    console.log(this.userService.userId);
    
  }


  saveCustomerRequest() {

  }
}