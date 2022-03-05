import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  duration5Seconds: number = 5000;

  constructor(private toast: NgToastService) { }

  success(title: string, message: string) {
    this.toast.success({detail: title, summary: message, duration: this.duration5Seconds});
  }

  error(title: string, message: string) {
    this.toast.error({detail: title, summary: message, duration: this.duration5Seconds});
  }

  warning(title: string, message: string) {
    this.toast.warning({detail: title, summary: message, duration: this.duration5Seconds});
  }

  info(title: string, message: string) {
    this.toast.info({detail: title, summary: message, duration: this.duration5Seconds});
  }
}
