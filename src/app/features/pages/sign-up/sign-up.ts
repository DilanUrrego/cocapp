import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
})
export class SignUp {
  @Output() closePopup = new EventEmitter<void>();

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(Auth);

  title = "Crear Cuenta";

  signUpForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    repassword: ['', [Validators.required]],
    profilePhoto: [''] // Esto puede ser string | null | undefined
  });

  onSignUp() {
    if (!this.signUpForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    const password = this.signUpForm.value.password;
    const repassword = this.signUpForm.value.repassword;

    if (password !== repassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas deben ser iguales.',
      });
      return;
    }

    // ✅ Solución: Convertir null/undefined a undefined explícitamente
    const user: User = {
      email: this.signUpForm.value.email!,
      password: password!,
      name: this.signUpForm.value.username!,
      rePassword: repassword!,
      profilePhoto: this.signUpForm.value.profilePhoto || undefined // ✅ Esto soluciona el error
    };

    this.authService.signUp(user).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: response.message || 'Usuario registrado correctamente',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/recipes']);
            this.closePopup.emit();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en registro',
            text: response.message || 'Ocurrió un error inesperado',
          });
        }
      },
      error: (error) => {
        console.error('Error en signup:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor.',
        });
      }
    });
  }

  close() {
    this.closePopup.emit();
  }
}