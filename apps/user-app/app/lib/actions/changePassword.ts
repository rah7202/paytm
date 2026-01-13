"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { prisma as db } from "@repo/db"
import bcrypt from "bcrypt"

export async function changePassword(formData: FormData) {

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return {
            error : "Unauthorized"
        };
    }

    const oldPassword= formData.get("oldPassword") as string;
    const newPassword= formData.get("newPassword") as string;

    const user = await db.user.findUnique({
        where: {
            id : Number(session.user.id)
        }
    });

    if (!user) {
        return {
            error : "User not found"
        };
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    
    if (!isValid) {
        return {
            error : "Incorrect old password"
        };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({
        where : { id : user.id },
        data : {
            password: hashedPassword
        }
    });

    return { success : "Password updated successfully" };
}