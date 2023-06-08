import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DatabaseService } from '../database.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  panelOpenState = false;
  // customerId = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public databaseService: DatabaseService,
    public expansionPanel: MatExpansionModule) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.databaseService.customerId = params.get('id') || '';
      console.log(this.databaseService.customerId);
      this.databaseService.getCustomer();
    });
  }


  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    dialog.componentInstance.databaseService.customer = new Customer(this.databaseService.customer.toJSON());
    dialog.componentInstance.databaseService.customerId = this.databaseService.customerId;
    dialog.afterClosed().subscribe(() => {
      this.databaseService.getCustomer();
    });
  }
}