import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Wallet } from "../entity/Wallet";
import { AppDataSource } from "../data-source";

const jwtKey:string = process.env.TOKEN_KEY as string;

export const register = async(req:Request, res: Response) => {
    const {username, email, password, password_confirmation} = req.body;

    if(!(username && email && password)){
        return res.status(400).send("All fields are required");
    }

    if(password.length < 8){
        return res.status(400).send("Password must be a minimum of 8 characters");
    }

    if(password !== password_confirmation){
        return res.status(400).send("Password confirmation does not match");
    }

    if(username.length < 8){
        return res.status(400).send("Username must be a minimum of 8 characters");
    }

    /*check if user already exists*/
    const existingUser = await User.findOne({where:[
        {email},
        {username}
    ]});

    if(existingUser){
        return res.status(409).send("There already exists an account with the provided email/username. Please try logging in instead.")
    }

    /*Encrypt user password*/
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await AppDataSource.transaction(async (transactionalEntityManager) =>{
            const userRepository = transactionalEntityManager.getRepository(User);
            const walletRepository = transactionalEntityManager.getRepository(Wallet);

            const user = userRepository.create({
                username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
        
            await transactionalEntityManager.save(user);
        
            /*create wallet for user*/
            const wallet = walletRepository.create({user})
            await transactionalEntityManager.save(wallet);
        
            /*create auth token*/
            const token  = jwt.sign(
                {user_id: user.id, email},
                jwtKey,
                {
                    expiresIn: "10h"
                }
            )
            return res.status(201).json({user:{id: user.id, username: user.username, balance:wallet.balance}, token});
        })
    } catch (error:any) {
        return res.status(400).send(error.message);
    }

   
        
        /*Create user in db*/
        // const userRepository = queryRunner.manager.getRepository(User);
        // const walletRepository = queryRunner.manager.getRepository(Wallet);

        // const user = userRepository.create({
        //     username,
        //     email: email.toLowerCase(),
        //     password: encryptedPassword,
        // });
    
        // await queryRunner.manager.save(user);
    
        // /*create wallet for user*/
        // const wallet = walletRepository.create({user})
        // await queryRunner.manager.save(wallet);
    
        // /*create auth token*/
        // const token  = jwt.sign(
        //     {user_id: user.id, email},
        //     jwtKey,
        //     {
        //         expiresIn: "2h"
        //     }
        // )

       // await queryRunner.commitTransaction();
    
        // return res.status(201).json({user:{id: user.id, username: user.username, balance:user.wallet.balance}, token});
    // } catch (error:any) {
    //     await queryRunner.rollbackTransaction();
    //     return res.status(400).send(error.message);
    // } finally{
    //     await queryRunner.release();
       
    // }

}

export const login = async(req:Request, res:Response) => {
    const {email, password} = req.body;

    /**validate input */
    if(!(email && password)){
        return res.status(400).send("Illegal login attempt");
    }

    /**check user */
    const user = await User.findOne({where: [
        {email},
        {username:email}
    ],relations:["wallet"]})

    if(user){
        if(await bcrypt.compare(password, user.password)){
            const token  = jwt.sign(
                {user_id: user.id, email},
                jwtKey,
                {
                    expiresIn: "10h"
                }
            )
            return res.status(200).json({ user:{id:user.id, username: user.username,balance:user.wallet.balance}, token });
        }else{
            return res.status(403).send("Illegal login attempt");
        }
    }else{
        return res.status(403).send("Illegal login attempt");
    }
}