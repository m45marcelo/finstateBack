export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    avatarPublicId: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CreatedUserData {
    name: string;
    email: string;
    password: string;
}

export interface UpdatedUserData {
    name?: string;
    email?: string;
    avatarUrl?: string;
    avatarPublicId?: string;
    password?: string;
}