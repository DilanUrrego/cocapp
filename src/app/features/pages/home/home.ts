import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';
import { SignUp } from '../sign-up/sign-up';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, Login, SignUp],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  showLogin = false;
  showSignUp = false;

  private route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['authError']) {
        Swal.fire({
          icon: 'warning',
          title: 'Acceso denegado',
          text: 'Debes iniciar sesión primero',
          confirmButtonText: 'Entendido'
        }).then(() => {
          this.router.navigate(['home']);
        });
      }
    });
  }
}
