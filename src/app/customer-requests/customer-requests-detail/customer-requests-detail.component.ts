import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../shared/theme.service';
import { CustomerRequestsService } from '../../shared/customer-requests.service';
import { CustomerService } from '../../shared/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCustomerRequestComponent } from '../dialog-edit-customer-request/dialog-edit-customer-request.component';
import { DialogAddCustomerRequestNoteComponent } from '../dialog-add-customer-request-note/dialog-add-customer-request-note.component';
import { CustomerRequestsNotesService } from '../../shared/customer-requests-notes.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-customer-request-detail',
  templateUrl: './customer-requests-detail.component.html',
  styleUrls: ['./customer-requests-detail.component.scss']
})
export class CustomerRequestsDetailComponent implements OnInit {
  isLightTheme: boolean = false;
  customerRequestToShow: any = {};
  customerRef: string = '';
  customerName: string = '';
  dueDate: string = '';
  customerRequestNotes: any = [];
  customerRequestNoteUser: string = '';


  constructor(
    private route: ActivatedRoute,
    public themeService: ThemeService,
    public customerRequestsService: CustomerRequestsService,
    public customerService: CustomerService,
    public dialog: MatDialog,
    public customerRequestsNotesService: CustomerRequestsNotesService,
    public userService: UserService
  ) { }


  async ngOnInit() {
    this.route.paramMap.subscribe(async (params: any) => {
      this.customerRequestsService.customerRequestId = params.get('id') || '';
      await this.customerRequestsService.getCurrentCustomerRequest();
      this.customerRequestToShow = this.customerRequestsService.currentCustomerRequest;
      this.customerRef = this.customerRequestToShow.customerRef;
      this.dueDate = new Date(this.customerRequestToShow.dueDate).toLocaleDateString(); 
      await this.getCustomerName(this.customerRef);  
    });
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;        
    });
    this.customerRequestsNotesService.getNotesByRequestRef(this.customerRequestsService.customerRequestId)
      .subscribe(data => {
        this.customerRequestNotes = data;
        console.log('Diese Request Notes', this.customerRequestNotes);
    });
    this.customerRequestNoteUser = await this.userService.getUserFullNameById(this.userService.userLoggedInId);
  }


  async getCustomerName(customerRef: string) {
    this.customerService.customerId = customerRef;
    await this.customerService.getCustomer();
    const customer = this.customerService.customer;
    this.customerName = customer.name || '';
    console.log('Customer name is: ', this.customerName);
  }


  async editCustomerRequestDetail() {
    console.log('Edit customer request detail clicked');
    const dialog = this.dialog.open(DialogEditCustomerRequestComponent);
    dialog.componentInstance.customerRequestsService.currentCustomerRequest = this.customerRequestToShow;
    dialog.componentInstance.customerRequestsService.customerRequestId = this.customerRequestsService.customerRequestId;
    dialog.componentInstance.customerName = this.customerName;
    dialog.afterClosed().subscribe(async () => {
      await this.customerRequestsService.getCurrentCustomerRequest();
      this.customerRequestToShow = this.customerRequestsService.currentCustomerRequest;
      this.dueDate = new Date(this.customerRequestToShow.dueDate).toLocaleDateString();
    });
  }


  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerRequestNoteComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}
