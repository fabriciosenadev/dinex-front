import { LaunchRegister } from "./launch-register.interface";
import { PayMethodRegister } from "./pay-method-register.interface";

export interface LaunchAndPayMethodRegister {
    launch: LaunchRegister;
    payMethodFromLaunch: PayMethodRegister | null;
}