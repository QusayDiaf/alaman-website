import { Routes } from '@angular/router';

export const routes: Routes = [
     {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
   
    {
      path: 'about',
      loadComponent: () => import('./features/sections/about/about').then(m => m.About)
    },
    {
      path: 'contact',
      loadComponent: () => import('./features/sections/contact/contact').then(m => m.Contact)
    },
    {
      path:'services',
      loadComponent: () => import('./features/sections/services/services').then(m => m.Services)
    }
];
