import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @Output() closePopup = new EventEmitter<void>();

  router = inject(Router);
  fb = inject(FormBuilder);
  title = "Iniciar sesión";
  authService = inject(Auth);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

onLogin() {
    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Faltan campos por completar o son incorrectos.',
      });
      return;
    }

    let user = this.loginForm.value as User;
    let loginResponse = this.authService.login(user);

    if (!!loginResponse.success) {
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: 'Redirigiendo...',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/recipes']);
      });
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error de autenticación',
      text: 'Usuario o contraseña incorrectos.',
  });
  }

  close() {
    this.closePopup.emit();
  }
}
