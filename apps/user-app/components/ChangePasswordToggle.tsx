"use client"
import { useState } from "react";
import { Button } from "@repo/ui/button";
import ChangePassword from "./ChangePassword";

export default function ChangePasswordToggle() {
    const [showform, setShowform] = useState(false);

    return (
        <div className="mt-6">
            <Button onClick={() => {
                setShowform(!showform)
            }}>
                {showform ? "Hide Change Password" : "Change Password"}
            </Button>

            { showform && (
                <div className="mt-4 transition-all duration-300 ease-in-out"><ChangePassword /></div>
            )}
        </div>
    );
}