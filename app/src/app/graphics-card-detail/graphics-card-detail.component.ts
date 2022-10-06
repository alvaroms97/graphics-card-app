import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { GraphicsCard } from 'src/models/graphicsCard.model';
import { GraphicsCardsService } from 'src/services/graphics-cards.service';

@Component({
  selector: 'app-graphics-card-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graphics-card-detail.component.html',
  styleUrls: ['./graphics-card-detail.component.scss']
})
export class GraphicsCardDetailComponent implements OnInit {
  card = new GraphicsCard();
  $isLoading: Subject<boolean> = new Subject();
  id: string = "";

  constructor(public graphicsCardsSv: GraphicsCardsService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.card);

    this.graphicsCardsSv.getOne(this.id).subscribe(x => this.card = x);
  }

  ngOnInit(): void {

  }
}
