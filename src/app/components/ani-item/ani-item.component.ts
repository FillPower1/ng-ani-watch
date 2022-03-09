import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { PlayerService } from '../../player.service'

@Component({
  selector: 'app-ani-item',
  templateUrl: './ani-item.component.html',
  styleUrls: ['./ani-item.component.scss']
})
export class AniItemComponent implements OnInit {
  activeTitle: SafeResourceUrl = ''
  titleName?: string = ''

  constructor(
    private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.playerService.currentTitle.subscribe((item) => {
      if (!item.link) {
        this.router.navigate(['/'])
      } else {
        this.activeTitle = this.sanitizer.bypassSecurityTrustResourceUrl(item.link as string)
        this.titleName = item.info?.rus || item.title
      }
    })
  }
}
