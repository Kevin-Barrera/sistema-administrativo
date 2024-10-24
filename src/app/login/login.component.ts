import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';  
import { RouterModule, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';   ///TODOS LOS IMPORTS DE LOS COMPONENTES UTILIZADOS EN EL LOGIN

@Component({
  selector: 'app-login',
  standalone: true, //Componente independiente
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {// `OnInit` para usar el ciclo de vida del componente
  loginForm!: FormGroup;// Define un formulario reactivo
  hide = true;  // Esta propiedad controlará si la contraseña es visible o no

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializamos el formulario con dos campos: `username` y `password`.
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
     // Verificamos si el formulario es válido
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
      // lógica de autenticación
      // Redirigimos al panel principal después de la autenticación
      this.router.navigate(['/main']);

    } else {
      // Si el formulario es inválido, mostramos un mensaje en consola
      console.log('Formulario inválido');
    }
  }
  // Función para Nuevo usuario
  onRegister(): void {
    // Logica de registro
    console.log('Redirigiendo al registro...');
    
  }
}
