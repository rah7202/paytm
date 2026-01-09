import { prisma as db } from "@repo/db"
import bcrypt from "bcrypt"


async function main() {
    // const james  = await db.user.upsert({
    //     where : {
    //         number : '8743298745'
    //     },
    //     update : {

    //     },
    //     create : {
    //         number : '8743298745',
    //         password : await bcrypt.hash('james', 10),
    //         name : "James" ,
    //         Balance : {
    //             create : {
    //                 amount : 350000,
    //                 locked : 0
    //             }
    //         },
    //         onRampTransaction : {
    //             create : {
    //                 startTime : new Date(),
    //                 status : "Success",
    //                 amount : 350000,
    //                 token : "token_1",
    //                 provider : "HDFC Bank",
    //             },
    //         },
    //     },
    // });

    const bob = await db.user.upsert({
        where : {
            number : '9874598241'
        },
        update : {

        },
        create : {
            number : '9874598241',
            password : await bcrypt.hash('bob', 10),
            name : "Bob" ,
            Balance : {
                create : {
                    amount : 650000,
                    locked : 0
                }
            },
            onRampTransaction : {
                create : {
                    startTime : new Date(),
                    status : "Success",
                    amount : 650000,
                    token : "token_2",
                    provider : "HDFC Bank",
                },
            },
        },
    })

    console.log({bob})
}
main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e : Error) => {
        console.error(e);
        await db.$disconnect()
        process.exit(1)
    })

