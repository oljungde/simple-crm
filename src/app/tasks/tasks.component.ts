import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { CustomerRequestsService } from '../shared/customer-requests.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  isLightTheme: boolean = false;
  customerRequestsAsTasks: any = [];


  constructor(
    public themeService: ThemeService,
    public customerRequestsService: CustomerRequestsService,
    public userService: UserService
  ) { }


  ngOnInit(): void {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerRequestsService.getCustomerRequestsAsTasksByUserRef(this.userService.userLoggedInId)
      .subscribe((customerRequestsAsTasks: any) => {
        this.customerRequestsAsTasks = customerRequestsAsTasks;
        console.log('customerRequestsAsTasks is: ', this.customerRequestsAsTasks);
      });
  }


  searchTask() {
    console.log("searchTask");
  }
}
