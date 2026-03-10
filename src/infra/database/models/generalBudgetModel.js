"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralBudgetModel = void 0;
const mongoose_1 = require("mongoose");
const Budgets_1 = require("../../../core/entities/Budgets");
const mongoose_2 = require("mongoose");
const generalBudgetSchema = new mongoose_1.Schema({
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
        enum: Budgets_1.BUDGET_STATUS,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
exports.GeneralBudgetModel = (0, mongoose_2.model)('General_Budget', generalBudgetSchema);
