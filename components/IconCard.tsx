import {JSX} from "react";
import cards from '@/styles/cards.module.css'
interface IconCardProps {
    icon: string | JSX.Element;
    title: string;
    body: string;
}

export default function IconCard({icon, title, body}: IconCardProps) {
    return (
        <div className={cards.iconCardContainer}>
            <div className={cards.iconContainer}>
                {typeof icon === 'string' ? (
                    <img src={icon} alt="logo" className={cards.icon} />
                ) : (
                    icon
                )}
            </div>
            <h2 className={cards.cardTitle}>{title}</h2>
            <p className={cards.cardBody}>{body}</p>
        </div>
    )
}