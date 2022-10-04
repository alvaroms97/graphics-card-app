import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GraphicsCardsService } from './../../services/graphics-cards.service';
import { GraphicsCard } from './../../models/graphicsCard.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphics-card-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graphics-card-list-container.component.html',
  styleUrls: ['./graphics-card-list-container.component.scss']
})
export class GraphicsCardListContainerComponent implements OnInit {

  $cards: Observable<GraphicsCard[]> = new Observable();

  constructor(public graphicsCardsSv: GraphicsCardsService) {
    this.$cards = graphicsCardsSv.getAll();
  }

  ngOnInit(): void {
  }

  getOne() {

  }

}
