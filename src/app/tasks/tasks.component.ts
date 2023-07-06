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


  ngOnInit() {
    this.themeService.isLightTheme$.subscribe(isLightTheme => {
      this.isLightTheme = isLightTheme;
    });
    this.customerRequestsService.getCustomerRequestsAsTasksByUserRef(this.userService.userLoggedInId)
      .subscribe(async data => {
        await this.loadCustomerNames(data).then((tasks: any) => {
          this.customerRequestsAsTasks = tasks;
        });
      });
  }


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


  searchTask() {
    console.log("searchTask");
  }
}
