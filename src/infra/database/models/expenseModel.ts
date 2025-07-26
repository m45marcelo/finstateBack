import { model, Schema } from 'mongoose';
import { Expense, EXPENSE_CATEGORIES } from '../../../core/entities/Expense';

const expenseSchema = new Schema<Expense>(
    {
        idUser: {
            type: String,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100,
        },
        value: {
            type: Number,
            required: true,
            min: 0.01,
        },
        category: {
            type: String,
            required: true,
            enum: EXPENSE_CATEGORIES,
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
            },
        },
    },
);

export const ExpenseModel = model<Expense>('Expense', expenseSchema);
