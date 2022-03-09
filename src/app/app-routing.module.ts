import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { AniListComponent } from './pages/ani-list/ani-list.component'
import { AniItemComponent } from './pages/ani-item/ani-item.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: AniListComponent },
  { path: 'title/:id', component: AniItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
