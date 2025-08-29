import layout from '@/styles/layout.module.css'
import Link from "next/link";
export default function AvFooter() {
    return (
        <div className={layout.footer}>
            <Link href="/admin">Admin</Link>
            <Link href="/apps/chat">Apps</Link>
        </div>
    )
}