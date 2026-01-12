import { CreatedUserData, UpdatedUserData, User } from "../../core/entities/User";

export interface UserRepository {
    create(data: CreatedUserData): Promise<User>;
    findMany(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>;
    update(id: string, data: UpdatedUserData): Promise<User | null>;
    delete(id: string): Promise<void>;
}