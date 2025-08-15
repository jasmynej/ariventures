'use client'
import tableStyles from '@/styles/tables.module.css'
import buttonStyles from '@/styles/buttons.module.css'
import {useState, useEffect} from "react";
import {VisaStatus, VisaStatusResponse} from "@/types";
import {fetchAllVisaStatus} from "@/lib/model";

export default function AdminVisaStatus(){
    const [visas, setVisas] = useState<VisaStatus[]>([])
    const [curPage,setCurPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        fetchAllVisaStatus(curPage, false, 200)
            .then((data: VisaStatusResponse) => {
                setVisas(data.visas)
                setTotalPages(data.totalPages)
            })
    }, []);
    return (

        <div>
            <div className={tableStyles.primaryTableWrapper}>
                <table className={tableStyles.primaryTable}>
                    <thead className={tableStyles.primaryTableHeader}>
                    <tr>
                        <th>Passport</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {visas.map(visa => {
                            return(
                                <tr key={visa.id} className={tableStyles.primaryTableRow}>
                                    <td>
                                        <img src={visa.passport.flag_img} alt={visa.passport.name}/>
                                        {visa.passport.name}
                                    </td>
                                    <td>
                                        <img src={visa.destination.flag_img} alt={visa.destination.name}/>
                                        {visa.destination.name}
                                    </td>
                                    <td>
                                        {visa.status}
                                    </td>
                                    <td>
                                        {visa.notes}
                                    </td>
                                    <td>
                                        <div className={tableStyles.actions}>
                                            <button className={buttonStyles.edit}>
                                                <i className="fi fi-tr-pen-square"></i>
                                            </button>
                                            <button className={buttonStyles.trash}>
                                                <i className="fi fi-tr-trash-xmark"></i>
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

