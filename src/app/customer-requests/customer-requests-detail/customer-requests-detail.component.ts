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


  /**
   * get customer request id from url and get customer request details
   */
  async ngOnInit() {
    this.getDataForCustomerRequestDetail();
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerRequestsNotesService.getNotesByRequestRef(this.customerRequestsService.customerRequestId)
      .subscribe(data => {
        this.customerRequestNotes = data;
      });
    this.customerRequestNoteUser = await this.userService.getUserFullNameById(sessionStorage.getItem('userLoggedInId') || '');
  }


  /**
   * get customer request details
   */
  async getDataForCustomerRequestDetail() {
    this.route.paramMap.subscribe(async (params: any) => {
      this.customerRequestsService.customerRequestId = params.get('id') || '';
      await this.customerRequestsService.getCurrentCustomerRequest();
      this.customerRequestToShow = this.customerRequestsService.currentCustomerRequest;
      this.customerRef = this.customerRequestToShow.customerRef;
      this.customerRequestToShow.status = this.customerRequestToShow.status.replace('_', ' ');
      this.customerRequestToShow.subjectArea = this.customerRequestToShow.subjectArea.replace('_', ' ');
      if (this.customerRequestToShow.dueDate != 0) {
        this.dueDate = new Date(this.customerRequestToShow.dueDate).toLocaleDateString();
      }
      await this.getCustomerName(this.customerRef);
    });
  }


  /**
   * get customer name by customer reference 
   * @param customerRef string 
   */
  async getCustomerName(customerRef: string) {
    this.customerService.customerId = customerRef;
    await this.customerService.getCustomer();
    const customer = this.customerService.customer;
    this.customerName = customer.name || '';
  }


  /**
   * open dialog to edit customer request details and adjust customer request details after closing the dialog
   */
  async editCustomerRequestDetail() {
    const dialog = this.dialog.open(DialogEditCustomerRequestComponent);
    dialog.componentInstance.customerRequestsService.currentCustomerRequest = this.customerRequestToShow;
    dialog.componentInstance.customerRequestsService.customerRequestId = this.customerRequestsService.customerRequestId;
    dialog.componentInstance.customerName = this.customerName;
    dialog.afterClosed().subscribe(async () => {
      await this.customerRequestsService.getCurrentCustomerRequest();
      this.customerRequestToShow = this.customerRequestsService.currentCustomerRequest;
      this.formatDueDate();
      this.customerRequestToShow.status = this.customerRequestToShow.status.replace('_', ' ');
      this.customerRequestToShow.subjectArea = this.customerRequestToShow.subjectArea.replace('_', ' ');
    });
  }


  /**
   * format due date to dd.mm.yyyy if due date is not 0
   */
  formatDueDate() {
    if (this.customerRequestToShow.dueDate != 0) {
      this.dueDate = new Date(this.customerRequestToShow.dueDate).toLocaleDateString();
    } else {
      this.dueDate = '';
    }
  }


  /**
   * open dialog to add a new customer request note
   * @param isLightTheme boolean checks if the theme is light or dark and opens the dialog with the corresponding theme
   */
  openDialog(isLightTheme: boolean) {
    this.dialog.open(DialogAddCustomerRequestNoteComponent, {
      panelClass: isLightTheme ? 'light-theme' : 'dark-theme'
    });
  }
}
