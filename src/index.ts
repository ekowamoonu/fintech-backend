import express from 'express'
import dotenv from 'dotenv'
import verifyToken from './middleware/auth'
import { register, login } from './controllers/authController'
import { transfer, getTransactionHistory } from './controllers/transactionController'
import { AppDataSource } from './data-source';

dotenv.config();

AppDataSource.initialize().then(() => {

   const app = express();
  app.use(express.json());

   /*Test route*/
   app.get('/', (req, res) => {
    return res.json('Established connection!');
   })

   /*Authentication routes*/
   app.post('/register', register);
   app.post('/login',login);

   /**Transaction routes */
   app.post('/transactions',verifyToken,transfer);
   app.get('/transactions',verifyToken, getTransactionHistory)

   const port = process.env.APP_PORT || 3000
  
   return app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
   });
}).catch((error)=>{
    console.log(error);
    console.log(process.env.DB_PASSWORD)
})

