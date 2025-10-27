import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { SignUp } from './features/pages/sign-up/sign-up';
import { Login } from './features/pages/login/login';
import { Recipes } from './features/pages/recipes/recipes';
import { Calendar } from './features/pages/calendar/calendar';
import { Market } from './features/pages/market/market';


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
        path: 'recipes',
        component: Recipes
    },
    {
        path: 'calendar',
        component: Calendar
    },
     {
        path: 'market',
        component: Market
    },
    {
        path: '**', 
        redirectTo: '/'
    }
];