export const SUBSCRIPTION_CATEGORIES = [
    'Entretenimento',
    'Moradia',
    'Música',
    'Tecnologia',
    'Educação',
    'Transporte',
    'Saúde',
    'Outros',
] as const;

export const SUBSCRIPTION_FREQUENCIES = [
    'Mensal',
    'Anual',
    'Semanal',
    'Outra',
] as const;

export type SubscriptionCategories = (typeof SUBSCRIPTION_CATEGORIES)[number];
export type SubscriptionFrequencies = (typeof SUBSCRIPTION_CATEGORIES)[number];

export interface Subscription {
    id: string;
    idUser: string;
    name: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    nextPay: Date;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSubscriptionData {
    idUser: string;
    name: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    nextPay: Date
}

export interface UpdatedSubscriptionData {
    name?: string;
    value?: number;
    frequency?: SubscriptionFrequencies;
    category?: SubscriptionCategories;
    nextPay?: Date;
    active?: boolean;
}