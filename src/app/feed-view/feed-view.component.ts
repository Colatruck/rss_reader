import {Component, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeedListComponent} from "../feed-list/feed-list.component";

@Component({
  selector: 'app-feed-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feed-view.component.html',
  styleUrl: './feed-view.component.css'
})
export class FeedViewComponent {
  @ViewChild(FeedListComponent) feedlistcomponent: FeedListComponent;
}
