import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rightPanelActive: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword: boolean = false;
  showLoginPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      numero_de_documento: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      correo_electronico: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePanel(isSignUp: boolean): void {
    this.rightPanelActive = isSignUp;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleLoginPasswordVisibility(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }


  async register(): Promise<void> {
    /*
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  
    const newUser = this.registerForm.value;
    // Crear campo username y colocarle el valor de correo_electronico
    newUser.username = newUser.correo_electronico;
  
    try {
      const response = await this.authService.register(newUser);
      console.log(response);
      if (response && response) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Tu cuenta ha sido creada correctamente'
        });
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: response.message || 'No se pudo crear la cuenta, por favor intente de nuevo'
        });
      }
    } catch (error: any) {
      console.error(error.error);
  
      // Procesar los errores recibidos del servidor
      const processedErrors = this.processErrors(error.error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error en el Registro',
        text: processedErrors || 'Hubo un problema al intentar crear la cuenta.'
      });
    }
      */
  }


  /**
   * Función para procesar los errores y excluir el del username.
   * También traduce los mensajes de error al español.
   */
  processErrors(errors: any): string {
    const errorMessages = [];

    if (errors.correo_electronico) {
      errorMessages.push('Ya existe un usuario con este correo electrónico.');
    }

    if (errors.numero_de_documento) {
      errorMessages.push('Ya existe un usuario con este número de documento.');
    }

    // Ignorar el error del username
    // Puedes agregar más campos según tus necesidades

    // Unir todos los mensajes de error en una sola cadena
    return errorMessages.join('\n');
  }


  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Verificación directa para la cuenta de prueba
    if (loginData.email === 'thisisatestaccount@test.com' && loginData.password === 'thisisatestaccount23#') {
      localStorage.setItem('token', 'testToken');
      const testUser = {
        idUsuario: 0,
        nombre: "PRUEBA",
        apellido: "GOOGLE",
        email: loginData.email,
        telefono: "",
        direccion: "",
        fechaRegistro: new Date().toISOString(),
        foto: null,
        credencial: {
          idCredencial: 0,
          idUsuario: 0,
          username: "testUsername",
          password: "",
          rol: "ADMIN"
        }
      };
      localStorage.setItem('user', JSON.stringify(testUser));
      this.router.navigate(['/home']);
      return;
    }

    try {
      this.authService.login(loginData.email, loginData.password).subscribe(response => {
        if (response) {
          console.log(response);
          // Extrae el token del encabezado "Authorization"
          const token = response.headers.get('Authorization')?.replace('Bearer ', '');

          if (token) {
            localStorage.setItem('token', token); // Almacenar el token en localStorage
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo obtener el token de autenticación'
            });
            return;
          }

          // Guarda el resto de la respuesta (el usuario) en localStorage
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión, por favor intente de nuevo, revise que la VPN esté activa'
          });
        }
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo establecer conexión con el servidor, por favor verifique su conexión a internet e intente de nuevo'
        });
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un error inesperado, por favor intente de nuevo más tarde'
      });
    }
  }




}