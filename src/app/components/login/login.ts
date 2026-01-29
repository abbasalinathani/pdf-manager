import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathNames } from '../../shared/constants';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { LoginRequestDto } from '../../models/request/auth';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/auth/toast.service';
import { Toast } from '../../models/toast';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, HlmSpinnerImports],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  public loginForm!: FormGroup<LoginForm>;
  public isLoading!: boolean;

  constructor() {
    this.initializeForm();
  }

  /**
   * Initializes form
   */
  private initializeForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  /**
   * Navigates to register
   */
  public navigateToRegister(): void {
    this.router.navigate([PathNames.REGISTER]);
  }

  public login(): void {
    if (this.loginForm.valid) {
      const request = new LoginRequestDto(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );

      this.isLoading = true;
      this.authService.login(request).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.authService.setToken(response.accessToken);
          this.toastService.show(new Toast('Login successful', 'You are now logged in'));
          this.router.navigate([PathNames.MAIN]);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
