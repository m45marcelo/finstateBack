import { Schema, model } from "mongoose";
import { User } from "../../../core/entities/User";

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Email inválido",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_, ret) => {
                ret.id = ret._id.toString();

                delete (ret as any)._id;
                delete (ret as any).__v;

                return ret
            },
        },
    }
);

export const UserModel = model<User>("User", userSchema);
