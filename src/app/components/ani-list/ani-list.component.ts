import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PlayerService, Results } from '../../player.service'

@Component({
  selector: 'app-ani-list',
  templateUrl: './ani-list.component.html',
  styleUrls: ['./ani-list.component.scss']
})
export class AniListComponent implements OnInit {
  api = 'bazon'
  items: Results[] = []
  error = ''

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerService.aniList.subscribe({
      next: (response) => {
        this.error = ''
        this.items = response.results || []
        this.api = response.api ?? 'bazon'
      },
      error: err => {
        this.error = err.message
        this.items = []
      }
    })
  }

  watchThis(currentTitle: Results) {
    this.playerService.emitCurrentTitle(currentTitle)
    this.router.navigate(['title', currentTitle.kinopoisk_id])
  }
}
