import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId: string = '';


  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log(this.userId);
    });
  }
}
