'use client'
import dashboard from '@/styles/admin/dash.module.css'
import Link from "next/link";
import dashStyles from "@/styles/admin/dash.module.css";
import { usePathname } from 'next/navigation';
import {NavLinks} from "@/types/core";

interface SideNavProps {
    links: NavLinks,
    baseLink: string
}

export default function SideNav({links, baseLink}: SideNavProps) {
    const pathname = usePathname();
    return (
        <div className={dashboard.sideNavContainer}>
            <div className={dashboard.sideHeader}>
                <img src="/images/ariventures_logo.png" alt="logo" />
            </div>

            <div className={dashStyles.nav}>
                {links.map((link) => {
                    const isActive =
                        link.href === baseLink
                            ? pathname === baseLink // Only active if exactly on /admin
                            : pathname.startsWith(link.href); // Active if any nested route matches

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