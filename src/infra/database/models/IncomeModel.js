"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeSchema = void 0;
const Income_1 = require("../../../core/entities/Income");
const mongoose_1 = require("mongoose");
const incomeSchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: {
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
        enum: Income_1.INCOME_CATEGORIES
    }
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
exports.IncomeSchema = (0, mongoose_1.model)('Income', incomeSchema);
