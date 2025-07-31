import { UserRepository } from "../../application/repositories/UserRepository";
import { CreatedUserData, UpdateUserData, User } from "../../core/entities/User";
import { UserModel } from "../database/models/userModel";



export class MongoUserRepository implements UserRepository {
    async create(data: CreatedUserData): Promise<User> {
        const user = await UserModel.create({
        ...data,
        createdAt: new Date()
        })

        return user.toJSON();
    }

    async findMany(): Promise<User[]> {
        const users = await UserModel.find();
        
        return users;
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);

        return user ? user.toJSON() : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email });
        
        return user ? user.toJSON() : null;
    }

    async update(id: string, data: UpdateUserData): Promise<User | null> {
        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date()
            },
            { new: true }
        )

        return user ? user.toJSON() : null;
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}