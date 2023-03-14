import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUsername } from '../../store/selectors/user.selector';
import { Login } from '../../store/actions/user.actions';

import type { AppState } from '../../store/models/app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  username$ = this.store.select(selectUsername);

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.username$.subscribe({
      next: (v) => {
        if (!!v) {
          this.router.navigate(['search']);
        }
      }
    })
  }

  login() {
    if (this.username.valid) {
      this.store.dispatch(Login({ username: this.username.value! }));
    }
  }
}
