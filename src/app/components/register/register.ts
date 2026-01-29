import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { passwordMatchValidator } from '../../shared/validators/passwordMatchValidator';
import { Router } from '@angular/router';
import { PathNames } from '../../shared/constants';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { RegisterRequestDto } from '../../models/request/auth';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/auth/toast.service';
import { Toast } from '../../models/toast';

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  firstName?: FormControl<string>;
  lastName?: FormControl<string>;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, HlmSpinnerImports],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  public registerForm!: FormGroup<RegisterForm>;
  public isLoading!: boolean;

  constructor() {
    this.initializeForm();
  }

  /**
   * Initializes form
   */
  private initializeForm(): void {
    this.registerForm = new FormGroup<RegisterForm>({
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      confirmPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      lastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    }, { validators: passwordMatchValidator });
  }

  /**
   * Navigates to login
   */
  public navigateToLogin(): void {
    this.router.navigate([PathNames.LOGIN]);
  }

  public register() {
    if (this.registerForm.valid) {
      const request = new RegisterRequestDto(
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.confirmPassword.value,
        this.registerForm.controls.firstName!.value,
        this.registerForm.controls.lastName!.value
      );

      this.isLoading = true;
      this.authService.register(request).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.toast.set(new Toast('Registration Successful', 'You can now log in with your credentials.'));
          this.router.navigate([PathNames.LOGIN]);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.toast.set(new Toast('Registration Failed', error.error.message || 'An error occurred during registration.'));
        }
      });
    }
  }
}
