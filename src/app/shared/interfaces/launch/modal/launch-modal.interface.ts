import { LaunchStatus } from "../enums/launchStatusEnum";

export interface LaunchModal {
  id?: number;
  date: Date;
  categoryId: number;
  description: string;
  amount: number;
  status: LaunchStatus;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  applicable?: string;
  categoryName: string;
  payMethod: string;
  isToDelete: boolean;
}