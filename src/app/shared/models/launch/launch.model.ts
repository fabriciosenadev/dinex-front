import { launchStatus } from "../../helpers/Enums/launchStatusEnum";

export interface Launch {
    id: number;
    date: string;
    categoryId: number;
    description: string;
    amount: number;
    status: launchStatus;
    userId: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    applicable: string | null;
    categoryName: string | null;
}