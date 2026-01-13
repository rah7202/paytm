import { authOptions } from "../../lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { Button } from "@repo/ui/button";
import ChangePassword from "../../../components/ChangePassword";
import ChangePasswordToggle from "../../../components/ChangePasswordToggle";
export default async function() {

    const session = await getServerSession(authOptions);

    if (!session?.user) {

        redirect("/api/auth/signin");
    }

    return (
        <div  className="p-8">
            <h2 className="text-2xl font-bold">
                Welcome back, {session.user.name || "User"}
            </h2>
            <p className="text-gray-600 mt-2">
                logged in as : {session.user.email}
            </p>
            <div className="pt-4">
                <ChangePasswordToggle />
            </div>
        </div>
        
    );


    
}