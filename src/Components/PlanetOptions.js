import React, { useState, useEffect } from 'react';
import './GreekTrust.css'
import './PlanetOptions.css'

function PlanetOption(props) {
    const [selectVehicle, setSelectVehicle] = useState("")
    const [selectPlanet,setSelectPlanet] = useState("")
    const [distance, setDistance] = useState()

    useEffect(() => {
        if (props.destination.length === 0) {
            setSelectPlanet("")
            setSelectVehicle("")
        }
    },[props.destination])

    function FindDistanceToPlanet(planet) {
        const planet_obj = props.planets.find(plt => plt.name === planet)
        const planet_distance = planet_obj.distance
        return planet_distance
    }

    function handlePlanetChange (event,selectPlanet) {
        setSelectVehicle("new_vehicle")
        setSelectPlanet(event.target.value)
        setDistance(FindDistanceToPlanet(event.target.value))
        props.setDestination(selectPlanet,event.target.value,null,props.destination,props.vehicles)
    } 

    function handleVehicleChange (event,selectPlanet) {
        setSelectVehicle(event.target.value)
        props.setDestination("",selectPlanet,event.target.value,props.destination,props.vehicles)
    }

    return (
        <div className="select-destination">
            <div>
                <h5>Destination {props.index}</h5>
                <select autoComplete='on' value={selectPlanet} onChange={(event) => handlePlanetChange(event,selectPlanet)}>
                    <option value="" disabled hidden>Select your Options</option>
                    {props.planets.map(planet => {
                        if (props.destination.hasOwnProperty(planet.name) && planet.name !== selectPlanet) return null
                        return (
                            <option value={planet.name} key={planet.name}>
                                {planet.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            
            {selectVehicle !== "" ? 
            <div className="vehicles">
                <form onChange={(event) => handleVehicleChange(event,selectPlanet)}>
                    {props.vehicles.map(vehicle => {
                        return (
                            <div className="inner-vehicles" key={vehicle.name}>
                                <input type="radio" id={vehicle.name} name={props.index} value={vehicle.name} checked={vehicle.name === selectVehicle}
                                disabled={(vehicle.total_no === 0 && vehicle.name !== selectVehicle) || vehicle.max_distance < distance}/>
                                <span className={(vehicle.total_no === 0 && vehicle.name !== selectVehicle) || vehicle.max_distance < distance ? 'disabled' : ''}>
                                    {vehicle.name} ({vehicle.total_no})
                                </span>
                            </div>
                        )
                    })}
                </form>
            </div> : <></>}
        </div>
    )
}

export default PlanetOption;