import { launchStatus } from "../enums/launchStatusEnum";

export interface LaunchModal {
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
    categoryName: string;
    payMethod: string;
    isToDelete: boolean;
  }