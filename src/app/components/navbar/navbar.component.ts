import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchField = ''
  searchByKodik = false

  @Output() search = new EventEmitter()

  constructor(private router: Router) {}

  submit() {
    if (!this.searchField.trim()) {
      return
    }

    this.search.emit({
      title: this.searchField,
      searchByKodik: this.searchByKodik
    })
    this.router.navigate(['/search'])
  }
}
