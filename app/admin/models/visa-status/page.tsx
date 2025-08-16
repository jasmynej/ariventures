'use client'
import tableStyles from '@/styles/tables.module.css'
import buttonStyles from '@/styles/buttons.module.css'
import {useState, useEffect} from "react";
import {VisaStatus, VisaStatusResponse} from "@/types";
import {fetchAllVisaStatus} from "@/lib/model";
import models from "@/styles/admin/models.module.css"
import VisaStatusLabel from "@/components/VisaStatusLabel";
export default function AdminVisaStatus(){
    const [visas, setVisas] = useState<VisaStatus[]>([])
    const [curPage,setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const changePage = (page: number) => {
        if(page < 1 || page > totalPages) {
            page = 1;
        }

        setPage(page);
    }

    useEffect(() => {
        fetchAllVisaStatus(curPage, false, 200)
            .then((data: VisaStatusResponse) => {
                setVisas(data.visas)
                setTotalPages(data.totalPages)
            })
    }, [curPage]);
    return (

        <div>
            <div>Filters</div>
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
                                        <div className={models.imgFlagBox}>
                                            <img src={visa.passport.flag_img} alt={visa.passport.name}/>
                                            {visa.passport.name}
                                        </div>

                                    </td>
                                    <td>
                                        <div className={models.imgFlagBox}>
                                            <img src={visa.destination.flag_img} alt={visa.destination.name}/>
                                            {visa.destination.name}
                                        </div>

                                    </td>
                                    <td>
                                        <VisaStatusLabel label={visa.status}/>
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
            <div className={models.pagination}>
                <div onClick={() => changePage(curPage - 1)}>
                    <i className="fi fi-tr-angle-circle-left"></i>
                </div>
                <div>{curPage} out of {totalPages}</div>
                <div onClick={() => changePage(curPage + 1)}>
                    <i className="fi fi-tr-angle-circle-right"></i>
                </div>
            </div>
        </div>
    )
}

