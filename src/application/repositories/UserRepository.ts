import { CreatedUserData, UpdateUserData, User } from "../../core/entities/User";

export interface UserRepository {
    create(data: CreatedUserData): Promise<User>;
    getAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: UpdateUserData): Promise<User | null>;
    delete(id: string): Promise<void>;
}