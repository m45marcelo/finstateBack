import mongoose, { Schema } from 'mongoose';
import {
    BUDGET_CATEGORIES,
    BUDGET_STATUS,
    GeneralBudget,
} from '../../../core/entities/Budgets';
import { model } from 'mongoose';

const generalBudgetSchema = new Schema<GeneralBudget>(
    {
        idUser: {
            type: String,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
            min: 0.01,
        },
        spent: {
            type: Number,
            required: true,
        },
        remaining: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: BUDGET_STATUS,
        },
    }, 
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();

                delete (ret as any)._id;
                delete (ret as any).__v;

                return ret;
            }
        }

    }
);

export const GeneralBudgetModel = model<GeneralBudget>('General_Budget', generalBudgetSchema);