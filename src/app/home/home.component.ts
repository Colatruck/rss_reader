import {Component, OnInit} from '@angular/core';
import {FeedService} from '../service/feeds.service';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {FeedListComponent} from "../feed-list/feed-list.component";
import {Feed} from "../model/Feed";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FeedListComponent,FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  urlParent: string;
  feed: Feed;
  feedList: Feed[] = [];
  isFormActive: boolean = false;

  constructor(private feedService: FeedService,private library: FaIconLibrary) {
    this.feed = new Feed();
    library.addIcons(faTrash);
  }

  ngOnInit() {
    this.getFeedList();
  }

  getFeedList() {
    this.feedList = this.feedService.getLocalFeedList();
    this.feed = new Feed();
  }

  addFeed(form: NgForm) {
    this.isFormActive = false;
    this.feedService.addLocalFeed(this.feed);
    this.getFeedList();
    this.urlParent = "";
    form.reset();
  }

  getUrlFeed(url: string) {
    this.urlParent = url;
  }

  removeFeed(feed: Feed) {
    this.feedService.removeFeed(feed);
    this.getFeedList();
    this.urlParent = '';
  }

  toggleForm() {
    this.isFormActive = !this.isFormActive;
  }
}
