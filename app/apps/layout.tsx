import React from "react";
import dash from "@/styles/admin/dash.module.css"
import {appsNavLinks} from "@/data/MenuLinks";
import SideNav from "@/components/SideNav";

export default function AriventuresAppsLayout({children}: Readonly <{
    children: React.ReactNode;
}>){
    return (
        <html>
            <head>
                <title>Apps | Ariventures</title>
            </head>
            <body>
                <div className={dash.mainDashContainer}>
                    <SideNav links={appsNavLinks} baseLink="/apps"/>
                    <main className={dash.mainContent}>
                        <div className={dash.scrollArea}>
                            {children}
                        </div>
                    </main>

                </div>
            </body>

        </html>

    )
}