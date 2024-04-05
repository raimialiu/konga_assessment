import { FindOptionsOrderValue, In } from "typeorm";
import { DataAccessService } from "../data-access/data-access.service";
import { GenericResponse } from "../../dto/response.dto";
import { User } from "../../model/user.model";
import { Panic } from "../../common";

export class UserRepository extends DataAccessService {

    constructor() { super(); }

    async createUserAsync(details: Partial<User>) {
        const { email, first_name, last_name } = details
        const findIfEmailExist = await this.findOne(User, {
            where: [{ email }, { first_name }, { last_name }]
        })

        if (findIfEmailExist) {
            Panic(`user details exist before exist before...`)
        }

        const savedResult = await this.create(User, User.Create(details))

        return savedResult
    }

    async findOneUser(query: Partial<User>) {
        return await this.findOne(User, { where: { ...query } });
    }

    async findAllUser(query: Partial<User>, option: { page: number, limit: number }) {
        const {  page, limit } = option

        const take = limit || 100
        const currentPage = page || 1

        const skip = (currentPage - 1) * take
        return await this.findMany(User, { where: { ...query }, skip, take, order: { created_at: "DESC"} });
    }

    async updateUser(condition: Partial<User>, changes: Partial<User>) {

        return await this.update(User, condition, changes);

    }

    async deleteUser(condition: Partial<User>) {

        return await this.delete(User, condition);

    }

}