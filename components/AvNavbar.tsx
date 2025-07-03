'use client';
import Navbar from "@/components/Navbar";

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];


export default function AvNavbar() {
    return (
        <Navbar logo="/images/ariventures_logo.png" links={navLinks} />
    )
}
