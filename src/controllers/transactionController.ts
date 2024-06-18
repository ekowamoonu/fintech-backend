import { Request, Response } from "express";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Wallet } from "../entity/Wallet";
import { sendMail } from "../services/mailService";


export const transfer = async(req:Request, res:Response) => {
    const {recipientId, amount, idempotencyKey} = req.body;

    const senderId = res.locals.user.user_id;

    /**validate input */
    if (!(senderId && recipientId && amount && idempotencyKey)) {
        return res.status(400).send("All fields are required");
    }

    /**check idempotency */
    const existingTransaction = await Transaction.findOne({where:{idempotencyKey}});   
    if(existingTransaction){
        return res.status(409).send("Transaction already processed");
    }

    /**validate users */
    const sender = await User.findOne( {where:{id:senderId},relations:["wallet"]});
    const recipient = await User.findOne({where:{id:recipientId},relations:["wallet"]});

    if(!sender){
        return res.status(404).send("Sender not found");
    }

    if(!recipient){
        return res.status(404).send("Recipient not found");
    }

    /*Validate wallet funds */
    if(amount > sender.wallet.balance){
        return res.status(400).send("Insufficient funds");
    }

    try {
        await AppDataSource.transaction(async (transactionalEntityManager)=>{

            const transaction = Transaction.create({
                sender,
                recipient,
                amount,
                timestamp: new Date(),
                idempotencyKey
            });
        
            transactionalEntityManager.save(transaction);
        
            sender.wallet.balance -= amount;
            recipient.wallet.balance += amount;
        
            const walletRepository = transactionalEntityManager.getRepository(Wallet);
            await walletRepository.save(sender.wallet);
            await walletRepository.save(recipient.wallet);

            if(sender && recipient){
                sendMail(sender.email,"Debit Transaction Alert",`Hello there, a transaction just occured on your account. Debit amount: ${amount}`);
                sendMail(recipient.email,"Credit Transaction Alert",`Hello there, a transaction just occured on your account. Credit amount: ${amount} from ${sender.username}`);
            }
        
            return res.status(201).json({transaction:
                {
                    id:transaction.id,
                    amount: transaction.amount,
                    timestamp: transaction.timestamp,
                    senderUserName: transaction.sender.username,
                    recipientUsername: transaction.recipient.username,
                }, 
                balance:sender.wallet.balance});
        })
    } catch (error:any) {
        return res.status(400).send(error.message);
    }

}

export const getTransactionHistory = async (req: Request, res: Response) => {
    const {user_id} =  res.locals.user;

    const user = await User.findOne({where:{id:user_id}});
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    const transactions = await Transaction.find({
        where:[{sender:user},{recipient:user}],
        select:{
            id:true,
            amount:true,
            sender:{
                id:true,
                username:true
            },
            recipient:{
                id:true,
                username:true
            },
            timestamp:true
        },
        relations:["sender","recipient"]
    })


    return res.status(200).json(transactions);
}

