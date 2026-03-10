"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = require("mongoose");
const Expense_1 = require("../../../core/entities/Expense");
const expenseSchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        required: true,
        ref: 'User',
    },
    description: {
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
        enum: Expense_1.EXPENSE_CATEGORIES,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
exports.ExpenseModel = (0, mongoose_1.model)('Expense', expenseSchema);
