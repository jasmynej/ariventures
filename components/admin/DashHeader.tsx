'use client'
import dashStyles from '@/styles/admin/dash.module.css'
import { usePathname } from 'next/navigation';
import {NavLinks} from "@/types/core";
import Link from "next/link";

const pageTitlePatterns: { pattern: string; title: string }[] = [
    { pattern: "/admin", title: "Dashboard" },
    { pattern: "/admin/blog", title: "Blog" },
    { pattern: "/admin/blog-posts/new", title: "New Blog Post" },
    { pattern: "/admin/travel-guides", title: "Travel Guides" },
    { pattern: "/admin/users", title: "Users" },
    { pattern: "/admin/models", title: "Models" },
];

const pageTitles = {
    "/admin":  "Dashboard",
    "/admin/blog": "Blog",
    "/admin/blog-posts/new": "New Blog Post",
    "/admin/travel-guides": "Travel Guides",
    "/admin/users": "Users",
} as const;

export default function DashHeader () {
    const pathname = usePathname();

    const getPageTitle = (pathname: string): string => {
        // Sort patterns by length so exact matches come before broader ones
        const match = pageTitlePatterns
            .sort((a, b) => b.pattern.length - a.pattern.length)
            .find(({ pattern }) => pathname === pattern || pathname.startsWith(pattern + "/"));

        return match?.title ?? "Untitled";
    };

    const title = getPageTitle(pathname);
    return (
        <div className={dashStyles.dashHeaderContainer}>
            <h2 className={dashStyles.dashTitle}>{title}</h2>

        </div>
    )
}