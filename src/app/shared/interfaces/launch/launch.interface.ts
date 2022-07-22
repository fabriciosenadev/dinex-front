import { LaunchStatus } from "./enums/launchStatusEnum";

export interface Launch {
    id: number;
    date: string;
    categoryId: number;
    description: string;
    amount: number;
    status: LaunchStatus;
    userId: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    applicable: string | null;
}