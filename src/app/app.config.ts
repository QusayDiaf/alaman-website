import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // استيراد وسم التمرير فقط
// import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  
    provideRouter(
      routes,
      // withAnchorScrolling(),
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled', 
        anchorScrolling: 'enabled'            
      })
    ),


    // providePrimeNG({
    //   ripple: true,
    //   theme: { 
    //     preset: Aura,
    //     options: {
    //         darkModeSelector: 'none' 
    //     }
    //   },
    // }),
  ]
};
