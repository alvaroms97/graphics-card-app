import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphicsCardDetailComponent } from './graphics-card-detail/graphics-card-detail.component';
import { GraphicsCardListContainerComponent } from './graphics-card-list-container/graphics-card-list-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/graphics-cards', pathMatch: 'full' },
  { path: 'graphics-cards', component: GraphicsCardListContainerComponent },
  { path: 'graphics-cards/:id', component: GraphicsCardDetailComponent },
  { path: '**', redirectTo: '/graphics-cards' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
