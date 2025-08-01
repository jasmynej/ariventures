'use client'
import React from "react";
import modelStyles from '@/styles/admin/models.module.css'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {modelsNavLinks} from "@/data/MenuLinks";


export default function ModelsLayout({children}: Readonly <{
    children: React.ReactNode;
}>){
    const pathname = usePathname();
    const currentSegment = pathname.split("/").filter(Boolean).pop();
    return (
        <div>
            <div className={modelStyles.modelNav}>
                {
                    modelsNavLinks.map((link, index) => {
                        const linkSegment = link.href.replace("/", "");                   // e.g. "users"
                        const isActive = currentSegment === linkSegment;
                        return (
                            <div className={`${isActive ? modelStyles.active : ''}`} key={index}>
                                <Link href={`/admin/models${link.href}`} className={`${modelStyles.modelNavLink}`}>
                                    {link.label}
                                </Link>
                            </div>

                        )
                    })
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}