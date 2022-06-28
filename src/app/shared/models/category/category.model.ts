import { categoryApplicableEnum } from "./enums/categoryApplicableEnum";

export interface Category {
    id: number;
    name : string;
    applicable: categoryApplicableEnum;
    isCustom: boolean;
    createdAt: Date;
}