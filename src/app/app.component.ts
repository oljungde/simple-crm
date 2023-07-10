import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from './shared/theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangeUserLoginComponent } from './user/dialog-change-user-login/dialog-change-user-login.component';
import { User } from './models/user.class';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLightTheme$!: Observable<boolean>;
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  drawerMode$: BehaviorSubject<MatDrawerMode> = new BehaviorSubject<MatDrawerMode>('side');
  isSmallScreen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    public authService: AuthService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) { }


  /**
   * themeService.isLightTheme$ is an Observable<boolean> that is used to determine
   */
  ngOnInit() {
    this.isLightTheme$ = this.themeService.isLightTheme$;
  }


  /**
   * ngAfterViewInit() is called after the view is initialized and sets the drawerMode$ BehaviorSubject for brakepoints
   */
  ngAfterViewInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe((result) => {
      this.isSmallScreen = result.matches;
      if (this.isSmallScreen) {
        this.drawer?.close();
        this.drawerMode$.next('over');
      } else {
        this.drawer?.open();
        this.drawerMode$.next('side');
      }
    });
  }


  /**
   * toggle the theme about the finction toggleTheme() in the themeService
   */
  toggleTheme() {
    this.themeService.toggleTheme();
  }


  /**
   * open the DialogChangeUserLoginComponent to change the password
   */
  changePassword() {
    const dialogRef = this.dialog.open(DialogChangeUserLoginComponent);
  }


  /**
   * close the drawer on small screens
   */
  closeOnSmallScreen() {
    if (this.isSmallScreen) {
      this.drawer?.close();
      this.removeFocus();
    }
  }


  removeFocus() {
    const focusedElement = document.querySelector(':focus');
    if (focusedElement) {
      (focusedElement as HTMLElement).blur();
    }
  }
}