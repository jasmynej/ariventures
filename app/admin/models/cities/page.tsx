'use client'
import {useEffect, useState} from "react";
import {City} from "@/types";
import tableStyles from '@/styles/tables.module.css'
import buttonStyles from '@/styles/buttons.module.css'
import {fetchAllCities} from "@/lib/model";
export default function AdminCitiesPage(){
    const [cities, setCities] = useState<City[]>([])

    useEffect(() => {
        fetchAllCities().then((data) => {
            setCities(data)
        })
    }, []);
    return (
        <div>
            <div className={tableStyles.primaryTableWrapper}>
                <table className={tableStyles.primaryTable}>
                    <thead className={tableStyles.primaryTableHeader}>
                        <tr>
                            <th>Country</th>
                            <th>Name</th>
                            <th>State/Province</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cities.map(city => {
                        return (
                            <tr key={city.id} className={tableStyles.primaryTableRow}>
                                <td>
                                    <img src={city.country.flag_img} alt={city.country.name}/>
                                    {city.country.name}
                                </td>
                                <td>{city.name}</td>
                                <td>{city.state_province == "" ? '-' :city.state_province }</td>
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