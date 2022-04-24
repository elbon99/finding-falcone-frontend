import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Header from './Header';
import './Success.css'

function Success() {
    const [planet, setPlanet] = useState("")
    const [duration, setDuration] = useState(0)
    let navigate = useNavigate()

    function OnSuccess() {
        const planet_name = localStorage.getItem("planet_name")
        setPlanet(planet_name)
        setDuration(localStorage.getItem("time_taken"))
    }

    useEffect(() => {
        OnSuccess()
    }, [])

    return (
        <>
            <Header />
            <div className="page-container">
                <div className='container'>
                    <div className='success-text'>Success! Congratulations on Finding Falcone. King Shan is mighty pleased</div>
                    <div className='success-desc'>Time Taken: {duration}</div>
                    <div className='success-desc'>Planet Found: {planet}</div>
                </div>
                <input type="button" value="Start Again!" onClick={() => navigate('/')} className='other-button'/>
            </div>
            <footer className='container'>Coding problem - www.geektrust.in/finding-falcone</footer>
        </>
    )
}

export default Success;