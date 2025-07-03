'use client';

import {JSX, useState} from 'react';
import layout from '@/styles/layout.module.css'

interface NavLink {
    label: string;
    href: string;
}

interface NavbarProps {
    logo: string | JSX.Element;
    links: NavLink[];
}
export default function Navbar({ logo, links }: NavbarProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={layout.header}>
            <div>
                {typeof logo === 'string' ? (
                    <img src={logo} alt="logo" className={layout.site_logo} />
                ) : (
                    logo
                )}
            </div>

            <button
                className={layout.hamburger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`${layout.navigation} ${isOpen ? layout.show : ''}`}>
                {links.map((link) => (
                    <a key={link.href} href={link.href}>
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
}