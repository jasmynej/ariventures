'use client'
import {useEffect, useState} from "react";
import {getAllCountries} from "@/repo/countries";
import {Countries} from "@/types";
import tableStyles from '@/styles/tables.module.css'
import buttonStyles from '@/styles/buttons.module.css'
export default function AdminCountries(){
    const [countries, setCountries] = useState<Countries>([])

    useEffect(() => {
        getAllCountries().then(data => setCountries(data))
            .catch(error => console.log(error))
    }, []);
    return (
        <div>
            <div className={tableStyles.primaryTableWrapper}>
                <table className={tableStyles.primaryTable}>
                    <thead className={tableStyles.primaryTableHeader}>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Region</th>
                        <th>Sub-Region</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        countries.map(country => {
                            return (
                                <tr key={country.id} className={tableStyles.primaryTableRow}>
                                    <td>
                                        <img src={country.flag_img} alt="flag" />
                                    </td>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.region}</td>
                                    <td>{country.sub_region}</td>
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
                        })
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}