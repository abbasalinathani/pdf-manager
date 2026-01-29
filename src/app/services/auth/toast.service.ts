import { Injectable, signal } from "@angular/core";
import { Toast } from "../../models/toast";

@Injectable({ providedIn: 'root' })
export class ToastService {

    public toast = signal<Toast | null>(null);

    public show(toast: Toast) {
        this.toast.set(toast);
    }
}