import { Injectable } from "@angular/core";
import { NotificationService } from "../services/notification/notification.service";

@Injectable({
    providedIn: 'root'
})

export class Notifications {
    successTitle: string = "Sucesso!";
    errorTitle: string = "Erro!";

    constructor(
        public notify: NotificationService
    ) { }

    handleSuccess = (message: string) => {
        this.notify.success(this.successTitle, message);
    }

    handleError(resultErrors: any) {
        console.log(resultErrors);

        let generalError = resultErrors.error;

        // TODO: need to implement error translater from enum

        if (generalError?.message)
            this.notify.error(this.errorTitle, generalError.message);
            
        // TODO: need to implement specific errors from validations
    }
}