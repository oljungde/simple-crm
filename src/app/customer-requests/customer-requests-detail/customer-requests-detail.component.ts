import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerRequestsService } from '../../shared/customer-requests.service';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer-request-detail',
  templateUrl: './customer-requests-detail.component.html',
  styleUrls: ['./customer-requests-detail.component.scss']
})
export class CustomerRequestsDetailComponent implements OnInit {
  customerRequestToShow: any = {};
  customerRef: string = '';
  customerName: string = '';

  constructor(
    private route: ActivatedRoute,
    public customerRequestsService: CustomerRequestsService,
    public customerService: CustomerService
  ) { }


  async ngOnInit() {
    this.route.paramMap.subscribe(async (params: any) => {
      console.log('Params are: ', params.get('id'));
      this.customerRequestsService.customerRequestId = params.get('id') || '';
      console.log('From Service: ', this.customerRequestsService.customerRequestId);
      await this.customerRequestsService.getCurrentCustomerRequest();
      this.customerRequestToShow = this.customerRequestsService.currentCustomerRequest;
      this.customerRef = this.customerRequestToShow.customerRef;
      console.log('Customer Request to show: ', this.customerRequestToShow);
      console.log('Due date is: ', this.customerRequestToShow.dueDate);
      console.log('Customer Ref from ts is', this.customerRequestToShow.customerRef);   
      await this.getCustomerName(this.customerRef);  
    });
  }


  async getCustomerName(customerRef: string) {
    this.customerService.customerId = customerRef;
    await this.customerService.getCustomer();
    const customer = this.customerService.customer;
    this.customerName = customer.name || '';
    console.log('Customer name is: ', this.customerName);
  }


  editCustomerRequestDetail() {
    console.log('Edit customer request detail clicked');
    
  }
}
