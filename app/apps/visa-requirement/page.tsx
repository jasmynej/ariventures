'use client'
import layout from '@/styles/layout.module.css'
import typography from '@/styles/typography.module.css'
import form from '@/styles/forms.module.css'
import buttons from '@/styles/buttons.module.css'
import {getCountriesWithVisaStatus, getAllCountries} from "@/repo/countries";
import {fetchVisaStatus} from "@/lib/model";
import React, {useEffect, useState} from "react";
import {Country, VisaStatus} from "@/types";
import VisaStatusResult from "@/components/VisaStatusResult";
export default function VisaRequirementCheckerApp(){
    const [destinations, setDestinations] = useState<Country[]>([])
    const [passports, setPassports] = useState<Country[]>([])
    const [destination, setDestination] = useState<number>(0)
    const [passport, setPassport] = useState<number>(0)
    const [visaStatus, setVisaStatus] = useState<VisaStatus>()
    
    useEffect(() => {
        getCountriesWithVisaStatus().then((data) => {setPassports(data)})
        getAllCountries().then((data) => setDestinations(data))
    }, []);
    
    const getVisaStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fetchVisaStatus(passport, destination)
            .then((data) => {
                console.log(data)
                setVisaStatus(data)
            })
    }

    return (
        <div>
            <div className={layout.sectionSmall}>
                <h1 className={typography.adminPageTitle}>Visa Requirement Checker</h1>
                <p>Simplify your travel planning by quickly checking visa requirements between any two countries.</p>
            </div>
            <div className={layout.sectionSmall}>
                <div className={form.visaStatusForm}>
                    <form>
                        <div className={form.row}>
                            <div>
                                <h3 className={form.formLabel}>Passport</h3>
                                <select onChange={(e) => setPassport(parseInt(e.target.value))}>
                                    {passports.map((passport)=>
                                        <option key={passport.id} value={passport.id}>{passport.name}</option>
                                    )}
                                </select>
                                <p className={form.desc}>Where is your passport from?</p>
                            </div>
                            <div>
                                <h3 className={form.formLabel}>Destination</h3>
                                <select onChange={(e) => setDestination(parseInt(e.target.value))}>
                                    {destinations.map((destination)=>
                                        <option key={destination.id} value={destination.id}>
                                            {destination.name}
                                        </option>)}
                                </select>
                                <p className={form.desc}>Where are you planning to go?</p>
                            </div>
                        </div>
                        <div className={form.row}>
                            <button className={buttons.primary} onClick={(e) => getVisaStatus(e)}>Check Visa Requirements</button>
                        </div>
                    </form>
                </div>
                {visaStatus &&
                   <VisaStatusResult status={visaStatus}/>
                }
            </div>
        </div>
    )
}