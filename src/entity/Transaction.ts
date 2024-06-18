import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=>User)
    sender!:User;

    @ManyToOne(() => User)
    recipient!: User;

    @Column('decimal',{precision: 12, scale:2})
    amount!:number;

    @Column()
    timestamp!: Date;

    @Column({unique: true})
    idempotencyKey!: string;
}