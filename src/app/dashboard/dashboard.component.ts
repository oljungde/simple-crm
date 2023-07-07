import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CustomerRequestsService } from '../shared/customer-requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numberOfAllCustomerRequests: number = 0;
  allCustomerRequests: any = [];
  closedCustomerRequests: number = 0;
  pendingCustomerRequests: number = 0;
  in_progressCustomerRequests: number = 0;


  constructor(
    public authService: AuthService,
    public customerRequestsService: CustomerRequestsService
  ) { }


  ngOnInit() {
    console.log('Dashboard, user loged in: ', this.authService.isUserLoggedIn);
    // console.log(this.customerRequestsService.allCustomerRequests$.getValue());
    this.customerRequestsService.allCustomerRequests$.subscribe((customerRequests) => {
      console.log('customerRequests: ', customerRequests);
      this.allCustomerRequests = customerRequests;
      this.numberOfAllCustomerRequests = customerRequests.length;
      console.log('numberOfAllCustomerRequests: ', this.numberOfAllCustomerRequests);
      this.getCustomerRequestsByStatus('pending');
      this.getCustomerRequestsByStatus('in_progress');
      this.getCustomerRequestsByStatus('closed');
    });
  }


  getCustomerRequestsByStatus(status: string) {
    this.allCustomerRequests.filter((customerRequest: any) => {
      if (customerRequest.status === status) {
        (this as { [key: string]: any })[`${status}CustomerRequests`] = (this as { [key: string]: any })[`${status}CustomerRequests`] + 1;
      }
    });
    console.log(`${status}CustomerRequests: `, (this as { [key: string]: any })[`${status}CustomerRequests`]);
  }
}
