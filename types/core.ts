import {JSX} from "react";

type NavLink = {
    label: string
    href: string
    icon: JSX.Element | undefined
}

export type NavLinks = NavLink[];