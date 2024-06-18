import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Wallet extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal',{precision:12,scale:2, default:1000})
    balance!: number;

    @OneToOne(()=> User, user => user.wallet)
    user!: User;
}

