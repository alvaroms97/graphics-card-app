import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsCardListContainerComponent } from './graphics-card-list-container.component';

describe('GraphicsCardListContainerComponent', () => {
  let component: GraphicsCardListContainerComponent;
  let fixture: ComponentFixture<GraphicsCardListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsCardListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsCardListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
