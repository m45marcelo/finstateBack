"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetByCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const Budgets_1 = require("../../../core/entities/Budgets");
const budgetByCategorySchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
        enum: Budgets_1.BUDGET_CATEGORIES
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
        enum: Budgets_1.BUDGET_STATUS
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__V;
            return ret;
        }
    }
});
exports.BudgetByCategoryModel = (0, mongoose_1.model)('Budget_By_Category', budgetByCategorySchema);
