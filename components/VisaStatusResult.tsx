import {VisaStatus} from "@/types";
import visas from '@/styles/visas.module.css'
import VisaStatusLabel from "@/components/VisaStatusLabel";
interface Props {
    status: VisaStatus;
}

export default function VisaStatusResult({ status }: Props){
    return (
        <div className={visas.statusResultContainer}>
            <div className={visas.row}>
                <div className={visas.flagCountry}>
                    <img src={status.passport.flag_img} alt={status.passport.name}/>
                    <p>{status.passport.name}</p>

                </div>
                <i className="fi fi-tr-arrow-right"></i>

                <div className={visas.flagCountry}>
                    <img src={status.destination.flag_img} alt={status.destination.name}/>
                    <p>{status.destination.name}</p>
                </div>
            </div>

            <VisaStatusLabel label={status.status}/>
            <div>
                <p>{status.notes}</p>
            </div>
        </div>
    )
}