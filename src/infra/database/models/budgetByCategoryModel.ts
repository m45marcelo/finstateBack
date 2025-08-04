import { model, Schema } from "mongoose";
import { BUDGET_CATEGORIES, BUDGET_STATUS, BudgetByCategory } from "../../../core/entities/Budgets";

const budgetByCategorySchema = new Schema<BudgetByCategory>(
    {
        idUser: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: BUDGET_CATEGORIES
        },
        limit: {
            type: Number,
            required: true,
            min: 0.01
        },
        spent: {
            type: Number,
            required: true
        },
        remaining: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: BUDGET_STATUS
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();

                delete (ret as any)._id;
                delete (ret as any).__V;

                return ret;
            }
        }
    }
)

export const BudgetByCategoryModel = model<BudgetByCategory>('Budget_By_Category', budgetByCategorySchema);

