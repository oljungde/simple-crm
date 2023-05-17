import { Component, OnInit } from '@angular/core';
import { ThemeService  } from '../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;


  constructor(private themeService: ThemeService) { }
  

  ngOnInit(): void {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }
}
