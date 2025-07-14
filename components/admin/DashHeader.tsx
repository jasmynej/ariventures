'use client'
import dashStyles from '@/styles/admin/dash.module.css'
import { usePathname } from 'next/navigation';
import {NavLinks} from "@/types/core";
import Link from "next/link";


const pageTitles = {
    "/admin":  "Dashboard",
    "/admin/blog": "Blog",
    "/admin/blog-posts/new": "New Blog Post",
    "/admin/travel-guides": "Travel Guides",
    "/admin/users": "Users",
} as const;

type PagePath = keyof typeof pageTitles;


export default function DashHeader () {
    const pathname = usePathname();
    const title = pageTitles[pathname as PagePath] ?? "Untitled";
    return (
        <div className={dashStyles.dashHeaderContainer}>
            <h2>{title}</h2>

        </div>
    )
}