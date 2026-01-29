import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { PathNames } from '../../shared/constants';

@Component({
  selector: 'app-main-menu',
  imports: [RouterOutlet, HlmIcon, NgIcon, RouterLinkWithHref],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu implements OnInit {

  public authService = inject(AuthService);

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public PathNames = PathNames;

  ngOnInit(): void {
    this.checkAndFetchUserDetails();
  }

  private checkAndFetchUserDetails(): void {
    if (this.authService.isAuthenticated) {
      if (this.authService.currentUser === null) {
        this.authService.getLoggedInUserDetails().subscribe({
          next: (userDetails) => {
            this.authService.currentUser = userDetails;
            this.cdr.detectChanges();
          },
          error: () => {
            console.error('Failed to fetch user details');
          }
        });
      } else {
        this.authService.currentUser = this.authService.currentUser;
        this.cdr.detectChanges();
      }
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  public redirectToDashboard(): void {
    this.router.navigate([PathNames.MAIN, PathNames.DASHBOARD]);
  }
}
