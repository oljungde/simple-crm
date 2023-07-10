import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CustomerRequestsService } from '../../shared/customer-requests.service';

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
  Customer_ServiceCustomerRequests: number = 0;
  OfferCustomerRequests: number = 0;
  OrderCustomerRequests: number = 0;
  SalesCustomerRequests: number = 0;
  InvoiceCustomerRequests: number = 0;
  LowPriorityCustomerRequests: number = 0;
  MediumPriorityCustomerRequests: number = 0;
  HighPriorityCustomerRequests: number = 0;

  constructor(
    public authService: AuthService,
    public customerRequestsService: CustomerRequestsService
  ) { }


  /**
   * subscribe to the allCustomerRequests$ Observable in the customerRequestsService
   * and call getDashboardData() when the Observable emits a value
   */
  ngOnInit() {
    this.customerRequestsService.allCustomerRequests$.subscribe((customerRequests) => {
      this.allCustomerRequests = customerRequests;
      this.getDashboardData();
    });
  }


  /**
   * getDashboardData() is called when the allCustomerRequests$ Observable in the customerRequestsService
   * and sets the values of the dashboard variables
   */
  getDashboardData() {
    this.numberOfAllCustomerRequests = this.allCustomerRequests.length;
    this.getCustomerRequestsByStatus('pending');
    this.getCustomerRequestsByStatus('in_progress');
    this.getCustomerRequestsByStatus('closed');
    this.getCustomerRequestsBySubjectArea('Customer_Service');
    this.getCustomerRequestsBySubjectArea('Offer');
    this.getCustomerRequestsBySubjectArea('Order');
    this.getCustomerRequestsBySubjectArea('Sales');
    this.getCustomerRequestsBySubjectArea('Invoice');
    this.getCustomerRequestsByPriority('Low');
    this.getCustomerRequestsByPriority('Medium');
    this.getCustomerRequestsByPriority('High');
  }


  /**
   * adjust the values of the dashboard variables
   * @param status is a string that is used to filter the allCustomerRequests array
   */
  getCustomerRequestsByStatus(status: string) {
    this.allCustomerRequests.filter((customerRequest: any) => {
      if (customerRequest.status === status) {
        (this as { [key: string]: any })[`${status}CustomerRequests`] = (this as { [key: string]: any })[`${status}CustomerRequests`] + 1;
      }
    });
  }


  /**
   * adjust the values of the dashboard variables
   * @param subjectArea is a string that is used to filter the allCustomerRequests array
   */
  getCustomerRequestsBySubjectArea(subjectArea: string) {
    this.allCustomerRequests.filter((customerRequest: any) => {
      if (customerRequest.subjectArea === subjectArea) {
        (this as { [key: string]: any })[`${subjectArea}CustomerRequests`] = (this as { [key: string]: any })[`${subjectArea}CustomerRequests`] + 1;
      }
    });
  }


  /**
   * get requests by priority
   * @param priority is a string that is used to filter the allCustomerRequests array
   */
  getCustomerRequestsByPriority(priority: string) {
    this.allCustomerRequests.filter((customerRequest: any) => {
      if (customerRequest.priority === priority) {
        (this as { [key: string]: any })[`${priority}PriorityCustomerRequests`] = (this as { [key: string]: any })[`${priority}PriorityCustomerRequests`] + 1;
      }
    });
  }
}
