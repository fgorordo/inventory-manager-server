import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "../models";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    full_name: string;

    @Column("text", {unique: true})
    email: string;

    @Column("text",{ select: false})
    password: string;

    @Column("text", {nullable: true})
    refresh_token_hash: string;

    @Column("bool", {default: true})
    is_active: boolean;

    @Column("text", {default: UserRoles.CUSTOMER})
    role: UserRoles

    @CreateDateColumn({name: "created_at", select: false})
    created_at: Date

    @UpdateDateColumn({name: "updated_at", select: false})
    updated_at: Date

    @DeleteDateColumn({name: "deleted_at", select: false})
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