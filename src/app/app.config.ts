import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideAnalytics } from '@angular/fire/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../../env/env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({ projectId: "cuac-design", appId: "1:121482677688:web:93831d6940daae2ddf534d", storageBucket: "cuac-design.firebasestorage.app", apiKey: "AIzaSyDwIcr47aUDCJnbWvBbUuyHf5SwGc3XIQU", authDomain: "cuac-design.firebaseapp.com", messagingSenderId: "121482677688", measurementId: "G-JT5JB6WHC1" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    
  ]
};
