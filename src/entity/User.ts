import { IsEmail, Length, MinLength } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Wallet} from "./Wallet";
import { Transaction } from './Transaction';


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique:true})
    @MinLength(8)
    username!: string;

    @Column({unique:true})
    @IsEmail()
    email!:string;

    @Column()
    @MinLength(8)
    password!: string;

    @OneToOne(()=>Wallet)
    @JoinColumn()
    wallet!:Wallet;

}