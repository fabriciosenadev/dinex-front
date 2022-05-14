import { launchRegister } from "./launch-register.model";
import { PayMethodRegister } from "./pay-method-register.model";

export interface LaunchAndPayMethodRegister {
    launch: launchRegister;
    payMethodFromLaunch: PayMethodRegister | null;
}