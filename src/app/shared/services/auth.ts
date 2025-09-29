import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class Auth {

  
  login(user:User):LoginResponse {
    
    let userSrt = localStorage.getItem(user.email);

    if (userSrt && user.password === JSON.parse(userSrt)['password']) {
      return { success: true };
    }
    return { success: false };
  }

  signUp(user:User):SignUpResponse {   
    
    if (localStorage.getItem('user.email')) {
      return { success: false, message: 'El usuario ya existe' };
    }

    localStorage.setItem(user.email, JSON.stringify(user));
    return { success: true, message: 'home' };

  }

}
