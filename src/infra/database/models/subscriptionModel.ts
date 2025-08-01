import mongoose, { Schema } from "mongoose";
import { Subscription, SUBSCRIPTION_CATEGORIES, SUBSCRIPTION_FREQUENCIES } from "../../../core/entities/Subscription";

const SubscriptionSchema = new Schema<Subscription>(
    {
        idUser: {
            type: String,
            required: true,
            ref: 'User'
        },
        name: {
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
            enum: SUBSCRIPTION_FREQUENCIES,
        },
        category: {
            type: String,
            required: true,
            enum: SUBSCRIPTION_CATEGORIES
        },
        nextPay: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toJSON();

                delete (ret as any)._id;
                delete (ret as any).__v;

                return ret;
            }
        }
    } 
);

export const subscriptionModel = mongoose.model<Subscription>('Subscription', SubscriptionSchema);