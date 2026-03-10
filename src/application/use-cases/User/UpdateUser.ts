import { UpdatedUserData, User } from "../../../core/entities/User";
import { NotFoundError } from "../../../shared/errors";
import { UserRepository } from "../../repositories/UserRepository";

interface UpdateUserRequest {
    id: string;
    name?: string;
    email?: string;
}

interface UpdateUserResponse {
    newUser: User | null;
}
export class UpdateUserUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute({id, name, email}: UpdateUserRequest):Promise<UpdateUserResponse>{
        const user = this.userRepository.findById(id)

        if(!user){
            throw new NotFoundError("Usuário não encontrado")
        }

        const updateUserData: UpdatedUserData = {
            name,
            email
        }

        const newUser = await this.userRepository.update(id, updateUserData);

        return{
            newUser
        }
    }
}