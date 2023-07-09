import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../models/customer.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { CustomerService } from '../../shared/customer.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public customerService: CustomerService,
    public expansionPanel: MatExpansionModule) { }


  /**
   * get customer id from url and get customer details
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.customerService.customerId = params.get('id') || '';
      this.customerService.getCustomer();
    });
  }


  /**
   * open dialog to edit customer details
   */
  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    dialog.componentInstance.customerService.customer = new Customer(this.customerService.customer.toJSON());
    dialog.componentInstance.customerService.customerId = this.customerService.customerId;
    dialog.afterClosed().subscribe(() => {
      this.customerService.getCustomer();
    });
  }
}