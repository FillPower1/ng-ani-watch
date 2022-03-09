import { Component } from '@angular/core'
import { PlayerService, SearchParams } from './player.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = false

  constructor(private playerService: PlayerService) {}

  search(searchParams: SearchParams) {
    this.isLoading = true
    this.playerService.search(searchParams).subscribe({
      next: (response) => this.playerService.emitAniList(null, response),
      error: err => this.playerService.emitAniList(err, {}),
      complete: () => this.isLoading = false
    })
  }
}
