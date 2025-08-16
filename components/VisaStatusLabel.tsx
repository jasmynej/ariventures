import {enumToCssId, enumToText} from "@/lib/utils";
import models from '@/styles/admin/models.module.css'
interface VisaStatusLabelProps {
    label: string;
}
export default function VisaStatusLabel({label}:VisaStatusLabelProps ) {


    return (
        <div className={`${models.statusLabel} ${models[enumToCssId(label)]}`}>{enumToText(label)}</div>
    )
}