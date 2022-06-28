import { launchRegister } from "./launch-register.interface";
import { PayMethodRegister } from "./pay-method-register.interface";

export interface LaunchAndPayMethodRegister {
    launch: launchRegister;
    payMethodFromLaunch: PayMethodRegister | null;
}