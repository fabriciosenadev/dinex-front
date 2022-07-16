import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  durationInSeconds: number = environment.durationShowNotification;

  constructor(private toast: NgToastService) { }

  success(title: string, message: string) {
    this.toast.success({detail: title, summary: message, duration: this.durationInSeconds});
  }

  error(title: string, message: string) {
    this.toast.error({detail: title, summary: message, duration: this.durationInSeconds});
  }

  warning(title: string, message: string) {
    this.toast.warning({detail: title, summary: message, duration: this.durationInSeconds});
  }

  info(title: string, message: string) {
    this.toast.info({detail: title, summary: message, duration: this.durationInSeconds});
  }
}
