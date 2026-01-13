"use client"

import { changePassword } from "../app/lib/actions/changePassword"
import { useState } from "react"

export default function ChangePassword() {
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        const res = await changePassword(formData);
        if (res.error) setMessage(res.error);
        else setMessage(res.success || "")
        
    }

    return (
        <div className="p-6 bg-slate-200 rounded-lg shadow-md maw-w-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form action={handleSubmit} className="space-y-4">
                <input
                  name="oldPassword"
                  type="password" 
                  placeholder="Old Password"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="newPassword"
                  type="password" 
                  placeholder="New Password"
                  className="w-full p-2 border rounded"
                  required
                />
                <button 
                   type="submit"
                   className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"

                >
                    Update Password
                </button>

            </form>
            {message && <p className="mt-4 text-sm font-medium">{message}</p>}
        </div>
    );
}