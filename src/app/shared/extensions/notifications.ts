import { Injectable } from "@angular/core";
import { NotificationService } from "../services/notification/notification.service";
import { SessionService } from "../services/session/session.service";

@Injectable({
    providedIn: 'root'
})

export class Notifications {
    successTitle: string = "Sucesso!";
    errorTitle: string = "Erro!";

    constructor(
        public notify: NotificationService,
        public session: SessionService,
    ) { }

    protected handleSuccess(message: string): void {
        this.notify.success(this.successTitle, message);
    }

    protected handleError(resultErrors: any): void {
        console.log(resultErrors);

        let generalError = resultErrors.error;

        if (generalError?.message) {

            if(generalError?.message === 'Unauthorized')
            {
                this.session.endSession();
                return;
            }
            // TODO: need to implement error translater from enum
            this.showSingleError(generalError.message);
        }

        //#region register user
        if (generalError.errors?.Email) {
            this.showMultipleErrors(generalError.errors?.Email);
        }
        if (generalError.errors?.Password) {
            this.showMultipleErrors(generalError.errors?.Password);
        }
        if (generalError.errors?.ConfirmPassword) {
            this.showMultipleErrors(generalError.errors?.ConfirmPassword);
        }
        if (generalError.errors?.FullName) {
            this.showMultipleErrors(generalError.errors?.FullName);
        }
        if (generalError.errors?.ActivationCode) {
            this.showMultipleErrors(generalError.errors?.ActivationCode);
        }
        //#endregion

        //#region register category
        if (generalError.errors?.Name) {
            this.showMultipleErrors(generalError.errors?.Name);
        }
        //#endregion

        //#region register launch
        if (generalError.errors?.PayMethodFromLaunch) {
            this.showMultipleErrors(generalError.errors?.Launch.PayMethodFromLaunch);
        }

        if (generalError.errors?.Launch) {
            this.showMultipleErrors(generalError.errors?.Launch.Date);
        }
        if (generalError.errors?.Launch) {
            this.showMultipleErrors(generalError.errors?.Launch.CategoryId);
        }
        if (generalError.errors?.Launch) {
            this.showMultipleErrors(generalError.errors?.Launch.Amount);
        }
        //#endregion
    }

    private showSingleError(message: string): void {
        this.notify.error(this.errorTitle, message);
    }

    private showMultipleErrors(errors: string[]): void {
        errors.forEach((message: string) => {
            this.notify.error(this.errorTitle, message);
        });
    }
}