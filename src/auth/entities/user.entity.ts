import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ValidRoles } from "../models";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    full_name: string;

    @Column("text", {unique: true})
    email: string;

    @Column("text")
    password: string;

    @Column("text", {nullable: true})
    refresh_token_hash: string;

    @Column("bool", {default: true})
    is_active: boolean;

    @Column("text", {array: true, default: [ValidRoles.USER]})
    roles: ValidRoles[]

    @CreateDateColumn({name: "created_at"})
    created_at: Date

    @UpdateDateColumn({name: "updated_at"})
    updated_at: Date

    @DeleteDateColumn({name: "deleted_at"})
    deleted_at: Date

    private normalizeFields() {
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeInsert()
    runBeforeInsert() {
        this.normalizeFields();
    }

    @BeforeUpdate()
    runBeforeUpdate() {
        this.normalizeFields();
    }
}