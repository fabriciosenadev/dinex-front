import { categoryApplicableEnum } from "../../helpers/Enums/categoryApplicableEnum";

export interface CategoryRegister {
    name: string;
    applicable: categoryApplicableEnum;
}