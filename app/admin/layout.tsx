import React from "react";
import dashStyles from "@/styles/admin/dash.module.css"
import SideNav from "@/components/SideNav";
import DashHeader from "@/components/admin/DashHeader";
import {adminSideNavLinks} from "@/data/MenuLinks";

export default function AdminDashLayout({children}: Readonly <{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Admin | Ariventures</title>
            </head>

            <body className={dashStyles.mainDashContainer}>
                <SideNav links={adminSideNavLinks} baseLink="/admin"/>
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