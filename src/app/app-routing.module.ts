import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AniItemComponent } from './components/ani-item/ani-item.component'
import { HomeComponent } from './home/home.component'
import { AniListComponent } from './components/ani-list/ani-list.component'

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
