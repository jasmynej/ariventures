import React from "react";
import layoutStyles from "@/styles/layout.module.css"
import dashStyles from "@/styles/admin/dash.module.css"
import SideNav from "@/components/admin/SideNav";
import DashHeader from "@/components/admin/DashHeader";

export default function AdminDashLayout({children}: Readonly <{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={dashStyles.mainDashContainer}>
                <SideNav/>
                <main className={dashStyles.mainContent}>
                    <DashHeader/>
                    <div className={dashStyles.scrollArea}>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}