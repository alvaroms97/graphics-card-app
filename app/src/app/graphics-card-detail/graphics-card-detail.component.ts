import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics-card-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graphics-card-detail.component.html',
  styleUrls: ['./graphics-card-detail.component.scss']
})
export class GraphicsCardDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
