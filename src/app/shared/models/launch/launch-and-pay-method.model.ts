import { Launch } from "./launch.model";
import { payMethodFromLaunch } from "./pay-method-from-launch.model";

export interface LaunchAndPayMethod {
    launch: Launch,
    PayMethod: payMethodFromLaunch | null,
}