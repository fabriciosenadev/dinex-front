import { categoryApplicableEnum } from "../../helpers/Enums/categoryApplicableEnum";

export interface Category {
    id: number;
    name : string;
    applicable: categoryApplicableEnum;
    isCustom: boolean;
    createdAt: Date;
}