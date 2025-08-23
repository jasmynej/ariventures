import {NavLinks} from "@/types/core";

const adminSideNavLinks: NavLinks = [
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
    },
    {
        label: "Data Models",
        href: "/admin/models",
        icon: <i className="fi fi-tr-folder-open"></i>
    }
]

const modelsNavLinks: NavLinks = [
    {
        label:"Countries",
        href: "/countries",
        icon: undefined
    },
    {
        label:"Cities",
        href: "/cities",
        icon: undefined
    },
    {
        label: "Visa Status",
        href: "/visa-status",
        icon: undefined
    }
]

const appsNavLinks: NavLinks = [
    {
        label: "Ai Chatbot",
        href:"/apps/chat",
        icon: undefined
    },
    {
        label: "Visa Checker",
        href:"/apps/visa-requirement",
        icon: undefined
    }
]

export {adminSideNavLinks, modelsNavLinks, appsNavLinks}