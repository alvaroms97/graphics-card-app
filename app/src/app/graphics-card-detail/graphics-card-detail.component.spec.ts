import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsCardDetailComponent } from './graphics-card-detail.component';

describe('GraphicsCardDetailComponent', () => {
  let component: GraphicsCardDetailComponent;
  let fixture: ComponentFixture<GraphicsCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsCardDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
