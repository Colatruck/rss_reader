import {Component, Input} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-feed-card',
  standalone: true,
    imports: [
        CommonModule
    ],
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent {
  @Input() feedItem: any;
}
