import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/auth/toast.service';
import { HlmToasterImports } from './../../libs/ui/sonner/src';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pdf-manager');

  public toastService = inject(ToastService)

  constructor() {
    effect(() => {
      if (this.toastService.toast()) {
        toast(this.toastService.toast()?.title!, {
          description: this.toastService.toast()?.description!
        });
        this.toastService.toast.set(null);
      }
    });
  }
}
