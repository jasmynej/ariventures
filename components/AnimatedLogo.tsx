import Image from "next/image";
import styles from "@/styles/animations.module.css";

type Props = {
    size?: number;      // px
    loop?: boolean;     // if false, plays once on mount
};

export default function AnimatedLogo({ size = 80, loop = true }: Props) {
    return (
        <div className={styles.wrap} data-loop={loop ? "true" : "false"}>
            <Image
                src="/images/ariventures_social_logo.png" // put your mini logo in public/images
                alt="Ariventures logo"
                width={size}
                height={size}
                className={styles.logo}
                priority
            />
            {/* subtle glow */}
            <div className={styles.glow} aria-hidden />
        </div>
    );
}