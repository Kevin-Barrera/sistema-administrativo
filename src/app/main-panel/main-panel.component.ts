import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para usar routerLink
import { MediaObserver, MediaChange } from '@angular/flex-layout';  // Para hacer el sidenav responsivo
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';  // Importamos filter para suscribirnos a los eventos de navegación
import { Subscription } from 'rxjs';  // Importamos Subscription para controlar los eventos

@Component({
  selector: 'app-main-panel',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule // Necesario para los routerLink
  ],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss'], // Cambié styleUrl por styleUrls para aceptar un array
})
export class MainPanelComponent implements OnInit {
  showWelcomeMessage = false;  // Variable para controlar si mostramos el mensaje
  isScreenSmall = false;  // Control para pantallas pequeñas
  mediaSub!: Subscription;  // Suscripción para observar los cambios en el layout
  sidenavMode: 'side' | 'over' = 'side';  // Cambia el modo del sidenav

  constructor(private router: Router, private mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación para actualizar el mensaje
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Filtrar solo eventos de navegación completada
    ).subscribe((event: any) => {
      this.showWelcomeMessage = event.url === '/main' || event.url === '/main/inicio';
    });

    // Observar los cambios en el tamaño de la pantalla para controlar el comportamiento responsivo
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      change.forEach((mediaChange) => {
        // Si la pantalla es pequeña (xs o sm), usamos 'over' para ocultar el sidenav
        if (mediaChange.mqAlias === 'xs' || mediaChange.mqAlias === 'sm') {
          this.isScreenSmall = true;
          this.sidenavMode = 'over';
        } else {
          this.isScreenSmall = false;
          this.sidenavMode = 'side';
        }
      });
    });
  }

  // Método para cerrar sesión
  onLogout(): void {
    localStorage.removeItem('authToken');  // Si se usa tokens para la autenticación
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }

  // Método que se llama al destruir el componente para desuscribirnos de los eventos
  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
}
