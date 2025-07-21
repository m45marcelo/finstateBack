import { CreatedUserData, UpdateUserData, User } from "../../core/entities/User";

export interface UserRepository {
    create(data: CreatedUserData): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(emal: string): Promise<User | null>;
    update(id: string, data: UpdateUserData): Promise<User | null>;
    delete(id: string): Promise<void>;
}