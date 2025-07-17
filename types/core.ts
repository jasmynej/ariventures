import {JSX} from "react";

type NavLink = {
    label: string
    href: string
    icon: JSX.Element | undefined
}

export type FormComponentProps = {
    value: any,
    onChangeAction: (value: any) => void,
}
export type NavLinks = NavLink[];
