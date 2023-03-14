import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() buttonLabel = '';
  @Input() label = ''
  @Input() enableSearch = false;
  query = ''

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {}

  emitSearch() {
    this.search.emit(this.query);
  }

  navigate(path: string) {    
    this.router.navigate([path]);
  }
}
