import express from "express"
import { prisma as db } from "@repo/db"

const app = express();
const PORT = 3003;
app.use(express.json())

app.post('/hdfcWebhook',async (req,res) => {

    const paymentInformation : {
        token: string;
        userId: string;
        amount: string;
    } = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    };
    
    // here we need to update the user balance

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.status(200).json({
            message: "Captured"
        })

    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        });  
    }  
});

app.listen(PORT, ()=> {
    console.log(`Bank Webhook is running on port ${PORT}`)
})