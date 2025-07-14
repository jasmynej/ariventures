'use client'
import dashboard from '@/styles/admin/dash.module.css'
import {NavLinks} from "@/types/core";
import Link from "next/link";
import dashStyles from "@/styles/admin/dash.module.css";
import { usePathname } from 'next/navigation';
const links: NavLinks = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: <i className="fi fi-tr-dashboard"></i>,
    },
    {
        label: "Blog Posts",
        href:"/admin/blog",
        icon:<i className="fi fi-tr-blog-pencil"></i>
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <i className="fi fi-tr-users-alt"></i>,
    },
    {
        label: "Travel Guides",
        href: "/admin/travel-guides",
        icon: <i className="fi fi-tr-guide-alt"></i>,
    }
]

export default function SideNav() {
    const pathname = usePathname();
    return (
        <div className={dashboard.sideNavContainer}>
            <div className={dashboard.sideHeader}>
                <img src="/images/ariventures_logo.png" alt="logo" />
                <p>Admin Dashboard</p>
            </div>

            <div className={dashStyles.nav}>
                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`${dashStyles.navItem} ${isActive ? dashStyles.active : ''}`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}