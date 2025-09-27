import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../shared/services/auth';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/interfaces/user';
import { passwordValidator } from '../../../shared/validator/password-validator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  imports: [ ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  @Output() closePopup = new EventEmitter<void>(); // 👈 para notificar al padre

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(Auth);
  title = "Registrar Usuario";

  validators = [Validators.required, Validators.minLength(5)];

  signUpForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.validators],
    repassword: ['', this.validators],
    profilePhoto: [null]
  }, { validators: passwordValidator });
  

  onSignUp() {
    if (this.signUpForm.errors?.['passwordMismatch']) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseñas diferentes',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    if(!this.signUpForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Faltan campos por completar o son incorrectos.',
      });
      return;
    }

    let user = this.signUpForm.value as User;
    let signUpResponse = this.authService.signUp(user);
    if(!!signUpResponse.success) {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Redirigiendo...',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate([signUpResponse.message]);
      });
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: signUpResponse.message || 'Ocurrió un error inesperado.',
    });
  }

  close() {
    this.signUpForm.reset(); // 👈 limpiar el form
    this.closePopup.emit();  // 👈 cerrar el popup en el padre
  }




}



