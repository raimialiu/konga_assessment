import { User } from "../../model/user.model";
import { UserRepository } from "../repository/user.repository";

export class UserService {
    /**
     *
     */
    constructor(private repo: UserRepository) {
    }


    async createUser(payload: Partial<User>) {

        const createResult = await this.repo.createUserAsync(payload)

    }
}