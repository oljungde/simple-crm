import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { DialogAddCustomerRequestComponent } from '../dialog-add-customer-request/dialog-add-customer-request.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRequestsService } from '../../shared/customer-requests.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.scss']
})
export class CustomerRequestsComponent implements OnInit {
  isLightTheme: boolean = false;
  @Input() customerId = '';
  customerRequests: any = [];
  @ViewChild('searchInput') searchInput: ElementRef | undefined;


  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public customerRequestsService: CustomerRequestsService
  ) { }


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerRequestsService.getCustomerRequests(this.customerId)
      .subscribe(data => {
        this.customerRequests = data;
        console.log('Diese Kundenanfragen', this.customerRequests);
      });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerRequestComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });    
  }


  searchCustomerRequest() {
    const searchTerm = this.searchInput?.nativeElement.value.toLowerCase();
    this.customerRequestsService.getCustomerRequests(this.customerId).pipe(
      map((data: any) => {
        return Array.isArray(data) ? data : [];
      })
    ).subscribe((data: any) => {
      this.customerRequests = data.filter((request: any) => {
        return (request.assignedTo.toLowerCase().includes(searchTerm) ||
          request.createdBy.toLowerCase().includes(searchTerm) ||
          request.customerContactName.toLowerCase().includes(searchTerm) ||
          request.description.toLowerCase().includes(searchTerm) ||
          request.priority.toLowerCase().includes(searchTerm) ||
          request.status.toLowerCase().includes(searchTerm) ||
          request.subjectArea.toLowerCase().includes(searchTerm) ||
          request.title.toLowerCase().includes(searchTerm)
        );          
      });
    });
  }
}