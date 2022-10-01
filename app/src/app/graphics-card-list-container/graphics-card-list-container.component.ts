import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics-card-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graphics-card-list-container.component.html',
  styleUrls: ['./graphics-card-list-container.component.scss']
})
export class GraphicsCardListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
