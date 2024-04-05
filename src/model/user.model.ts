import { hashSync } from "bcrypt";
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    /**
     *
     */
    constructor(data?: Partial<User>) {
        if (data) {
            const {
                email, first_name, last_name, password, role
            } = data

            this.email = email
            this.password = hashSync(password, 10)
            this.first_name = first_name
            this.last_name = last_name
            this.role = role
        }

    }

    static Create(data?: Partial<User>) {
        return new User(data)
    }

    @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, length: 120 })
    first_name: string

    @Column({ unique: true, length: 120 })
    last_name: string

    @Index()
    @Column({ unique: true, length: 120 })
    email: string

    @Column({})
    role: string

    @Column({ length: 120 })
    password: string

    @CreateDateColumn()
    created_at: Date

    @Column({ nullable: true })
    updated_at?: Date

}