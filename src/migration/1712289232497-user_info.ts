import { MigrationInterface, QueryRunner } from "typeorm"

export class userInfo1712289232497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('CREATE TABLE `users` (`id` varchar(36) NOT NULL, `first_name` varchar(120) NOT NULL, `last_name` varchar(120) NOT NULL, `email` varchar(120) NOT NULL, `role` varchar(255) NOT NULL, `password` varchar(120) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),`updated_at` datetime NULL, INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `fist_name_index` (`first_name`),UNIQUE INDEX `last_name_ondex` (`last_name`),UNIQUE INDEX `email_inex` (`email`), PRIMARY KEY (`id`))')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
