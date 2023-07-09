import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { CustomerRequestsService } from '../shared/customer-requests.service';
import { UserService } from '../shared/user.service';
import { CustomerService } from '../shared/customer.service';

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
    public userService: UserService,
    public customerService: CustomerService
  ) { }


  /**
   * subscribe to the isLightTheme$ Observable in the themeService
   * and call getCustomerRequestsAsTasksByUserRef() when the Observable emits a value
   * get the cusomer requests as tasks for the user that is logged in
   */
  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    const userLoggedInId = sessionStorage.getItem('userLoggedInId');
    if (userLoggedInId) {
      this.customerRequestsService.getCustomerRequestsAsTasksByUserRef(userLoggedInId)
        .subscribe(async (data: any) => {
          await this.loadCustomerNames(data).then((tasks: any) => {
            this.customerRequestsAsTasks = tasks;
          });
        });
    }
  }


  /**
   * get the cutomer names for the customer requests as tasks for the user that is logged in
   * @param tasks are the customer requests as tasks for the user that is logged in
   * @returns the customer requests as tasks for the user that is logged in with the customer name added
   */
  async loadCustomerNames(tasks: any[]) {
    const tasksWithNames = tasks.map(async task => {
      try {
        const customerName = await this.customerService.getCustomerNameById(task.customerRef);
        return { ...task, customerName };
      } catch (error) {
        console.error('Error while loading customer name:', error);
      }
    });
    const completedTasks = await Promise.all(tasksWithNames);
    return completedTasks;
  }


  /**
   * searchTask() is called when the user clicks the "Search" button
   */
  searchTask() {
    console.log("searchTask");
  }
}
