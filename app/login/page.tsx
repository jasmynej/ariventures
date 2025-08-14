import forms from '@/styles/forms.module.css'
import layout from '@/styles/layout.module.css'
import typography from '@/styles/typography.module.css'
export default function LoginPage() {
    return (
        <div>
            <div className={layout.section}>
                <h1 className={typography.pageTitle2}>Welcome Back</h1>
                <h4 className={typography.pageSubtitle}>Sign in to your Ariventures account to continue your journey with personalized travel advisory services</h4>
                <form></form>
            </div>

        </div>
    )
}