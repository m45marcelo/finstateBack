import { CreateIncomeData, Income, IncomeCategory } from '../../../core/entities/Income';
import { NotFoundError, ValidationError } from '../../../shared/errors';
import { IncomeRepository } from '../../repositories/IncomeRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface CreateIncomeRequest {
    idUser: string;
    description: string;
    value: number;
    category: IncomeCategory;
}

interface CreateIncomeResponse {
    income: Income;
}

export class CreateIncomeUseCase {
    constructor(
        private incomeRepository: IncomeRepository,
        private userRepository: UserRepository,
    ) {}

    async execute({idUser, description, value, category}: CreateIncomeRequest): Promise<CreateIncomeResponse> {
        const user = await this.userRepository.findById(idUser);
        if(!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if(value < 0) {
            throw new ValidationError('o Valor deve ser maior que zero');
        }

        const incomeData: CreateIncomeData = {
            idUser,
            description: description.trim(),
            value,
            category
        }

        const income = await this.incomeRepository.create(incomeData);

        return {
            income
        }
    }
}
