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

export const SUBSCRIPTION_STATUS = ["Pago", "Pendente"] as const;

export type SubscriptionCategories = (typeof SUBSCRIPTION_CATEGORIES)[number];
export type SubscriptionFrequencies = (typeof SUBSCRIPTION_CATEGORIES)[number];
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];

export interface Subscription {
    id: string;
    idUser: string;
    description: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    nextPay: Date;
    status: SubscriptionStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatedSubscriptionData {
    idUser: string;
    description: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    nextPay: Date
}

export interface UpdatedSubscriptionData {
    description?: string;
    value?: number;
    frequency?: SubscriptionFrequencies;
    category?: SubscriptionCategories;
    nextPay?: Date;
    status?: SubscriptionStatus;
}