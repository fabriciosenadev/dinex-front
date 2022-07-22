import { LaunchStatus } from "../enums/launchStatusEnum";

export interface LaunchRegister {
    date: Date;
    categoryId: number;
    description: string;
    amount: number;
    status : LaunchStatus;
}