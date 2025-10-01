import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';
import { SignUp } from '../sign-up/sign-up';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, Login, SignUp],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  showLogin = false;
  showSignUp = false;
}
