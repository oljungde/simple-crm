import { Component, OnInit } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  birthDate: Date | undefined; 


  constructor(private themeService: ThemeService) { }
  user = new User();
  

  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }

  saveUser() {
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current user is ', this.user);
  }
}
