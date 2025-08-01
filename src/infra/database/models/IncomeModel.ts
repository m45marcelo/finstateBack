import { Income, INCOME_CATEGORIES } from "../../../core/entities/Income";
import { model, Schema } from "mongoose";

const incomeSchema = new Schema<Income>(
    {
        idUser: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 100
        },
        value: {
            type: Number,
            required: true,
            min: 0.01
        },
        category: {
            type: String,
            required: true,
            enum: INCOME_CATEGORIES
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();

                delete (ret as any)._id;
                delete (ret as any).__v;

                return ret
            }
        }
    }
)


export const IncomeSchema = model<Income>('Income', incomeSchema);