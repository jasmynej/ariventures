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

export type MediaUploadOptions = {
    bucket: string,
    folder?: string,
    file: File,
}
export type NavLinks = NavLink[];
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;
export type NodeOf<T> = NonNullable<ArrayElement<NonNullable<T>>>;
export type NodeOfConnection<T> =
    NodeOf<NonNullable<T> extends { nodes?: infer N } ? N : never>;