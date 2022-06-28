import { Launch } from "./launch.interface";
import { payMethodFromLaunch } from "./pay-method-from-launch.interface";

export interface LaunchAndPayMethod {
    launch: Launch,
    payMethodFromLaunch: payMethodFromLaunch | null,
}