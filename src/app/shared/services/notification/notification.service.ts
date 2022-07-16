import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  durationInSeconds: number = environment.durationShowNotification;

  constructor(
    private toastr: ToastrService
  ) { }

  success(title: string, message: string) {
    this.toastr.success(message, title,
      {
        progressBar: true,
        closeButton: true,
        tapToDismiss: true
      }
    );
  }

  error(title: string, message: string) {
    this.toastr.error(message, title,
      {
        progressBar: true,
        closeButton: true,
        tapToDismiss: true
      }
    );
  }

  warning(title: string, message: string) {
    this.toastr.warning(message, title,
      {
        progressBar: true,
        closeButton: true,
        tapToDismiss: true
      }
    );
  }

  info(title: string, message: string) {
    this.toastr.info(message, title,
      {
        progressBar: true,
        closeButton: true,
        tapToDismiss: true
      }
    );
  }
}
