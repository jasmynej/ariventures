'use client'
import dashboard from '@/styles/admin/dash.module.css'
import Link from "next/link";
import dashStyles from "@/styles/admin/dash.module.css";
import { usePathname } from 'next/navigation';
import {adminSideNavLinks} from "@/data/MenuLinks";



export default function SideNav() {
    const pathname = usePathname();
    return (
        <div className={dashboard.sideNavContainer}>
            <div className={dashboard.sideHeader}>
                <img src="/images/ariventures_logo.png" alt="logo" />
            </div>

            <div className={dashStyles.nav}>
                {adminSideNavLinks.map((link) => {
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