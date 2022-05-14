import { launchStatus } from "../../../helpers/Enums/launchStatusEnum";

export interface launchRegister {
    date: Date;
    categoryId: number;
    description: string;
    amount: number;
    status : launchStatus;
}