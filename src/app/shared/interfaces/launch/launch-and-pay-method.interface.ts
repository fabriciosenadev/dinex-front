import { Launch } from "./launch.interface";
import { PayMethodFromLaunch } from "./pay-method-from-launch.interface";

export interface LaunchAndPayMethod {
    launch: Launch,
    payMethodFromLaunch: PayMethodFromLaunch | null,
}