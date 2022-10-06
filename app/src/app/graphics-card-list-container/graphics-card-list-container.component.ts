import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { GraphicsCardsService } from './../../services/graphics-cards.service';
import { GraphicsCard } from './../../models/graphicsCard.model';
import { combineLatest, debounceTime, delay, distinctUntilChanged, forkJoin, map, mergeMap, Observable, of, Subject, Subscription, takeUntil, concat, tap } from 'rxjs';
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

  $cards: Subject<GraphicsCard[]> = new Subject();
  $inputValue: Subject<string> = new Subject();
  $isLoadingList: Subject<boolean> = new Subject();

  currentPage = 1;

  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;

  constructor(public graphicsCardsSv: GraphicsCardsService, public observe: ObserverService, public router: Router) {
    this.$isLoadingList.next(true);

    // graphicsCardsSv.getAll().subscribe(x => this.$cards.next(x.data));
    // OR
    this.graphicsCardsSv.getPageWithSearch(this.currentPage).pipe(map(e => e.data)).subscribe(y => { this.$cards.next(y) });

    this.subscription = this.keyUp.pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(0),
      )),
    ).subscribe(v => this.$inputValue.next(v));
  }

  ngOnInit(): void {
    this.$inputValue.subscribe(v => {
      this.$cards.next([]);
      this.$isLoadingList.next(true);
    })

    this.$cards.subscribe(() => this.$isLoadingList.next(false));

    this.$cards.subscribe(console.log);

    this.$inputValue.pipe(debounceTime(1500)).subscribe(v => {
      console.log(v);
      this.$cards.next([]);
      this.graphicsCardsSv.getPageWithSearch(this.currentPage, v, 4).pipe(map(x => x.data)).subscribe(y => this.$cards.next(y));
      // forkJoin([this.$cards, this.graphicsCardsSv.getPageWithSearch(1, v, 6).pipe(map(e => e.data))]).pipe(map(x => x[0].concat(x[1]))).subscribe(y => this.$cards.next(y));
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onScrollDown($event: IInfiniteScrollEvent) {
    console.log($event);
    this.$isLoadingList.next(true);
    forkJoin([this.$cards, this.graphicsCardsSv.getPageWithSearch(this.currentPage + 1, undefined, 4).pipe(map(e => e.data))]).pipe(map(x => x[0].concat(x[1]))).subscribe(y => {this.$cards.next(y); this.currentPage++});
  }

  searchId() {
    this.$inputValue.pipe(debounceTime(1500)).subscribe(x => this.graphicsCardsSv.getOne(x).subscribe(y => {
      this.$cards.next([y]); this.$isLoadingList.next(false)
    })).unsubscribe();
  }

  goToDetails(id: string) {
    this.router.navigateByUrl('graphics-cards/' + id);
  }

}


