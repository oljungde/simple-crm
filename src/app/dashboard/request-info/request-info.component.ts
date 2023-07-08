import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss']
})
export class RequestInfoComponent {
  @Input() title: string = '';
  @Input() numberOfRequests: number = 0;

}
