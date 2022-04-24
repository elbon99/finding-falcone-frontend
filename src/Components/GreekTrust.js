import React, { useEffect, useState } from 'react';
import './GreekTrust.css'
import { backendAPI } from '../App';
import axios from 'axios';
import PlanetOption from './PlanetOptions';
import { useNavigate } from "react-router-dom"
import Header from './Header';

function GreekTrust() {
    const [planets, setPlanets] = useState([])
    const [availableVehicles, setAvailableVehicles] =useState([])
    const [destination, setDestination] = useState({})
    const [token,setToken] = useState("")
    let naviagte = useNavigate()

    const indexArray = Array(4).fill().map((obj,idx) => 1 + idx)

    async function GetAvailablePlanets() {
        const response = await axios.get(backendAPI.endpoint+'/planets').then(response => {
            setPlanets(response.data)
            GetAvailableVehicles()
            GetToken()
        }).catch(err => console.log(err))
        return response
    }

    async function GetAvailableVehicles() {
        const response = await axios.get(backendAPI.endpoint+'/vehicles').then(response => {
            setAvailableVehicles(response.data)
        }).catch(err => console.log(err))
        return response
    }

    async function GetToken() {
        const response = await axios.post(backendAPI.endpoint+'/token',{}, {
            headers: {'accept':'application/json'}
        }).then(response => {
            setToken(response.data.token)
        }).catch(err => console.log(err))
        return response
    }

    async function FindFalcone(destination,token,availableVehicles,planets) {
        if (!ValidateInputs(destination)) return null
        const planet_names = [], vehicle_names = []
        for (let dest in destination) {
            planet_names.push(dest)
            vehicle_names.push(destination[dest])
        }
        const reqObj = {
            "token":token,
            "planet_names":planet_names,
            "vehicle_names":vehicle_names
        }
        const response = await axios.post(backendAPI.endpoint+'/find',reqObj,{
            headers:{
                "accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(response => {
            if (response.data.status === "success") {
                const time_taken = CalculateTimeTaken(destination, availableVehicles, planets)
                localStorage.setItem("time_taken", time_taken)
                localStorage.setItem("planet_name", response.data.planet_name)
                naviagte('/success')
            }
            else {
                alert('Falcone not found')
                ResetInputs()
            }
        }).catch(err => {
            console.log(err)
            ResetInputs()
        })
        return response
    }

    function ResetInputs() {
        setDestination([])
        GetAvailableVehicles()
        GetToken()
    }

    function ValidateInputs (destination) {
        let count = 0
        for (let dest in destination) {
            if (destination[dest] == null) {
                alert ('Select a vehicle for each planet')
                return false
            }
            if (destination.hasOwnProperty(dest)) count++;
        }
        if (count < 4) {
            alert ('Choose 4 planets')
            return false
        }
        return true
    }

    function CalculateTimeTaken (destination, vehicles, planets) {
        let total_time = 0
        for (let dest in destination) {
            if (destination[dest] === null) continue
            let selected_vehicle = vehicles.find(veh => veh.name === destination[dest])
            let selected_planet = planets.find(planet => planet.name === dest)
            total_time += selected_planet.distance / selected_vehicle.speed
        }
        return total_time
    }

    function ChartDestination(previous_planet,select_planet,select_vehicle,destinations,vehicles) {
        let current_Vehicle = destinations.hasOwnProperty(select_planet) ? destinations[select_planet] : null
        let selected_destinations = destinations
        let available_vehicles = vehicles.map(avail_Vehicle => {
            let total_no = avail_Vehicle.total_no
            if (current_Vehicle !== null && avail_Vehicle.name === current_Vehicle) total_no += 1
            if (avail_Vehicle.name === select_vehicle) total_no -= 1
            return {
                "name":avail_Vehicle.name,
                "total_no": total_no,
                "max_distance": avail_Vehicle.max_distance,
                "speed": avail_Vehicle.speed
            }
        })
        if (previous_planet !== "") delete selected_destinations[previous_planet]
        selected_destinations[select_planet] = select_vehicle
        setAvailableVehicles(available_vehicles)
        setDestination(selected_destinations)
    }

    useEffect(() => {
        GetAvailablePlanets()
        // eslint-disable-next-line
    },[])
 
    return ( 
        <>  
            <Header reset={() => ResetInputs()} />
            <div className="page-container">
                <div className='container'>
                    <h3>Select planets you want to search in:</h3>
                    <div className="inner-container">
                        {indexArray.map(idx => (
                                <PlanetOption key={idx} index={idx} planets={planets}
                                vehicles={availableVehicles}  destination={destination} setDestination={ChartDestination}/>
                            ) )}
                        <span className='select-destination'>Time Taken: {CalculateTimeTaken(destination,availableVehicles,planets)}</span> 
                    </div>
                </div>
                <input type="button" value="Find Falcone!" className='other-button' onClick={() => FindFalcone(destination,token,availableVehicles,planets)} />
            </div>
            <footer className='container'>Coding problem - www.geektrust.in/finding-falcone</footer>
        </>
        
    );
}

export default GreekTrust;