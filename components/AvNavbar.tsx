'use client';
import Navbar from "@/components/Navbar";

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Ariventures Abroad', href: '#contact' },
];


export default function AvNavbar() {
    return (
        <Navbar logo="/images/ariventures_logo.png" links={navLinks} homeLink="/" />
    )
}
