import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { SignUp } from './features/pages/sign-up/sign-up';
import { Login } from './features/pages/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'sign-up', 
        component: SignUp
    },
    {
        path: '**', 
        redirectTo: ''
    }
];