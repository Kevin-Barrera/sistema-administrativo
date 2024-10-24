import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Importar el componente de login
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PlanesComponent } from './planes/planes.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProductosComponent } from './productos/productos.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Ruta principal para el MainPanel y sus rutas hijas
  {
    path: 'main', component: MainPanelComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Ruta por defecto al iniciar main
      { path: 'clientes', component: ClientesComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'productos', component: ProductosComponent },
    ]
  },
  //redicción por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Cualquier ruta no definida redirige al login
  { path: '**', redirectTo: '/login' }
];