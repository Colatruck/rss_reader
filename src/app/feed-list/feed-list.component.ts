import {Component, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";
import {FeedService} from '../service/feeds.service';
import {SafeHtmlPipe} from "../service/safe-html-pipe";
import {FeedItems} from "../model/FeedItems";
import {FeedViewComponent} from "../feed-view/feed-view.component";
import {FeedCardComponent} from "../feed-card/feed-card.component";
import {faCheck, faFontAwesome, faMoon, faSpinner, faSun, faSync} from "@fortawesome/free-solid-svg-icons";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-feed-list',
    standalone: true,
    imports: [CommonModule, SafeHtmlPipe, FeedViewComponent, FeedCardComponent,FontAwesomeModule],
    templateUrl: './feed-list.component.html',
    styleUrl: './feed-list.component.css'
})
export class FeedListComponent implements OnInit, OnChanges {

  @Input() childUrl: string;

  feedItemList: FeedItems[] = [];
  feedItem: any = [];
  isModalActive: boolean = false;
  isLoadingActive: boolean = false;
  isAboutActive: boolean = true;
  isDarkTheme: boolean = false;

  constructor(private feedService: FeedService,
              private _re: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private library: FaIconLibrary
              ) {
    library.addIcons(faSun, faMoon, faSpinner, faSync, faCheck, faFontAwesome);
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.childUrl) {
      this.getFeedItemsList();
    } else {
      this.childUrl = "";
    }
  }

  toggleModal(feedItem: FeedItems) {
    this.isModalActive = !this.isModalActive;
    this.feedItem = feedItem;
  }


  closeModal() {
    this.isModalActive = !this.isModalActive;
    this.feedItem = [];
  }

  getFeedItemsList() {
    this.isLoadingActive = true;
    const currentFeedList = this.feedService.getLocalFeedItems(this.childUrl);
    if (currentFeedList.length === 0) {
      this.feedService.getFeedList(this.childUrl).subscribe((feed: any) => {
          this.feedItemList = feed;
          this.isAboutActive = false;
          this.isLoadingActive = false;
          this.feedService.saveLocalFeedItems(this.childUrl, this.feedItemList);
        }, err => {
          this.clean();
        }
      )
    } else {
      this.isLoadingActive = false;
      this.isAboutActive = false;
      this.feedItemList = currentFeedList;
    }
  }

  removeFeedItems() {
    this.feedService.removeLocalFeedItems(this.childUrl);
    this.clean();
  }

  updateFeedItems() {
    this.isLoadingActive = true;
    this.feedService.getFeedList(this.childUrl).subscribe((feedItems: any) => {
      if (feedItems.length) {
        this.isLoadingActive = false;
        feedItems.map((map: any) => {
          const existItem = this.feedItemList.find(item => item.title == map.title);
          if (existItem) {
            console.log("Feed repeated");
          } else {
            this.feedItemList.unshift(map);
          }
        })
        this.isAboutActive = false;
        const FeedItemsNoExpired = this.feedItemList.filter((item: any) => new Date() < item.expiryDate);
        this.feedService.saveLocalFeedItems(this.childUrl, FeedItemsNoExpired);
      } else {
        this.getFeedItemsList();
        this.isAboutActive = false;
      }
    }, err => {
      this.clean();
    });
  }

  clean() {
    this.feedItemList = [];
    this.isModalActive = false;
    this.isLoadingActive = false;
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this._re.setAttribute(this.document.documentElement, 'data-theme', 'dark');
    } else {
      this._re.removeAttribute(this.document.documentElement, 'data-theme');
    }
  }
}
