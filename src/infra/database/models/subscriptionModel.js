"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Subscription_1 = require("../../../core/entities/Subscription");
const SubscriptionSchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0.01
    },
    frequency: {
        type: String,
        required: true,
        enum: Subscription_1.SUBSCRIPTION_FREQUENCIES,
    },
    category: {
        type: String,
        required: true,
        enum: Subscription_1.SUBSCRIPTION_CATEGORIES
    },
    startDate: {
        type: Date,
        required: true
    },
    nextPay: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Subscription_1.SUBSCRIPTION_STATUS
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id.toJSON();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
exports.subscriptionModel = mongoose_1.default.model('Subscription', SubscriptionSchema);
