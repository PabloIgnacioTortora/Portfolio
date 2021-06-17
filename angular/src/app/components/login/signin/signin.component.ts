import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    this.auth.login(this.username, this.password);
    this.router.navigate(['sobre-mi']);
  }
}
