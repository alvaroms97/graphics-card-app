import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { GraphicsCardsService } from './../../services/graphics-cards.service';
import { GraphicsCard } from './../../models/graphicsCard.model';
import { combineLatest, debounceTime, delay, distinctUntilChanged, forkJoin, map, mergeMap, Observable, of, Subject, Subscription, takeUntil, concat, tap, last, ReplaySubject, BehaviorSubject } from 'rxjs';
import { ObserverService } from 'src/services/observer.service';
import { GraphicsCardList } from 'src/models/graphicsCardsList.model';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-graphics-card-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graphics-card-list-container.component.html',
  styleUrls: ['./graphics-card-list-container.component.scss']
})
export class GraphicsCardListContainerComponent implements OnInit {

  $cards: BehaviorSubject<GraphicsCard[]> = new BehaviorSubject([new GraphicsCard()]);
  $inputValue: BehaviorSubject<string> = new BehaviorSubject("");
  $isLoadingList: Subject<boolean> = new Subject();
  $nextPageToLoad: Subject<number> = new Subject();
  $combinedCards: Subscription = new Subscription();

  currentPage = 1;
  lastPageAvalaible = 1;

  public keyUp = new Subject<KeyboardEvent>();
  private keySubscription: Subscription;

  constructor(public graphicsCardsSv: GraphicsCardsService, public observe: ObserverService, public router: Router) {
    this.$cards.next([]);

    // graphicsCardsSv.getAll().subscribe(x => this.$cards.next(x.data));
    // OR
    this.graphicsCardsSv.getPageWithSearch(1, undefined).pipe(map(e => e.data)).subscribe(y => this.$cards.next(y));

    this.keySubscription = this.keyUp.pipe(
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(0),
      )),
    ).subscribe(v => this.$inputValue.next(v));

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  };

  ngOnDestroy(): void {
    this.keySubscription.unsubscribe();
  }

  onScrollDown($event: IInfiniteScrollEvent) {
    let lastPageAvalaible = 1;

    this.$inputValue.subscribe(x => this.graphicsCardsSv.getPageWithSearch(this.currentPage + 1, x).pipe(map(x => x.paginationInfo.pageTotal)).subscribe(t => {
      lastPageAvalaible = t;

      if (this.currentPage < lastPageAvalaible) {
        this.$isLoadingList.next(true);

        of('dummy').pipe(delay(2000)).subscribe(() => { // Small delay

          this.graphicsCardsSv.getPageWithSearch(this.currentPage + 1, this.$inputValue.getValue()).pipe(map(e => e.data)).subscribe(y => {
            this.$cards.next(this.$cards.getValue().concat(y));
            this.currentPage++;
            this.$isLoadingList.next(false);

          });

        }) // "Of" end
      }

    }));

    // of('dummy').pipe(delay(2000)).subscribe(() => {

    //   this.graphicsCardsSv.getPageWithSearch(this.nextPage, this.$inputValue.getValue()).pipe(map(e => e.data)).subscribe(y => {
    //     this.$cards.next(this.$cards.getValue().concat(y));
    //     this.currentPage++;
    //   });

    // }) // "Of" end
  }

  search() {
    this.currentPage = 1;
    this.lastPageAvalaible = 1;

    this.$cards.next([]);
    this.$isLoadingList.next(true);

    this.$inputValue.subscribe(x => this.graphicsCardsSv.getPageWithSearch(this.currentPage, x).pipe(map(x => x.data), delay(1500)).subscribe(y => {
      this.$cards.next(y);
      this.$isLoadingList.next(false);
    }
    )).unsubscribe();


    // this.graphicsCardsSv.getPageWithSearch(this.currentPage, this.$inputValue.getValue()).pipe(map(x => x.data), delay(1500)).subscribe(y => { this.$cards.next(y); this.$isLoadingList.next(false) });
  }

  searchId() {
    this.currentPage = 1;
    this.lastPageAvalaible = 1;
    this.$cards.next([]);
    this.$isLoadingList.next(true);

    this.$inputValue.subscribe(x => this.graphicsCardsSv.getOne(x).pipe(delay(2500)).subscribe({
      next: (y) => {
        this.$cards.next([y]);
        this.$isLoadingList.next(false)
      },
      error: () => this.$isLoadingList.next(false)
    })).unsubscribe();
  }

  goToDetails(id: string) {
    this.router.navigateByUrl('graphics-cards/' + id);
  }

}


