import { DataAccessService } from "../data-access/data-access.service";
import { User } from "../../model/user.model";
import { Panic } from "../../common";

export class UserRepository extends DataAccessService {

    constructor() {
        super();
        //this.createTestAdmin().catch(console.log)

    }

    async createUserAsync(details: Partial<User>) {
        console.log({payloadDetails: details})
        const { email, first_name, last_name } = details
        const findIfEmailExist = await this.findOne(User, {
            where: [{ email: email }, { first_name: first_name }, { last_name: last_name }]
        })
        console.log({findIfEmailExist})

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
        const { page, limit } = option

        const take = limit || 100
        const currentPage = page || 1

        const skip = (currentPage - 1) * take
        return await this.findMany(User, { where: { ...query }, skip, take, order: { created_at: "DESC" } });
    }

    async updateUser(condition: Partial<User>, changes: Partial<User>) {

        return await this.update(User, condition, changes);

    }

    async deleteUser(condition: Partial<User>) {

        return await this.delete(User, condition);

    }

}