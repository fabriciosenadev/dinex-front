import { CategoryApplicableEnum } from "./enums/categoryApplicableEnum";

export interface Category {
    id?: number;
    name : string;
    applicable: CategoryApplicableEnum;
    isCustom?: boolean;
    createdAt?: Date;
}