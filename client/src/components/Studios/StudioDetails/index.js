import React, { useMemo, useContext, useEffect, useState, useRef } from "react";
import './style.css';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import background from "./1.webp";
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer } from "@react-google-maps/api"
import useGeoLocation from "../../StudioMap/UseGeoLocation";
import APIContext from "../../../Contexts/APIContext";

const image =
    "http://earth.google.com/images/kml-icons/track-directional/track-0.png";

const StudioDetails = () => {

    const [currentStudio, setCurrentStudio] = useState({})
    const { name } = useParams();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/studios/${name}/detail/`)
            .then(response => response.json())
            .then(json => {
                setCurrentStudio(json)
            })
    }, [name])

    if (!isLoaded) return <div>Loading...</div>
    return <>

        <div className="info" style={{
            backgroundImage: `url(${background})`
        }}>
            <div className="outer_text">
                <div className="text">
                <h1 id="title">{currentStudio.name}</h1>
                
                <p>Postal Code:{currentStudio.postal_code}</p>
                {currentStudio.phone_number === "" ? <></> : <p>Phone:{currentStudio.phone_number}</p>}
                <p>Address:{currentStudio.address}</p>
                <p>Latitude:{currentStudio.latitude}</p>
                <p>Longtitude:{currentStudio.longitude}</p>
                </div>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <Link to="/studio"><Button type="button" variant="dark">Back</Button></Link>
                    {currentStudio.latitude !== undefined && currentStudio.longitude !== undefined ? <Button type="button" variant="dark" onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=' + currentStudio.latitude + ',' + currentStudio.longitude)} >Get directions</Button> : <></>}

                    <Link to={"/class/" + currentStudio.name}> <Button type="button" variant="dark">Class</Button></Link>

                </div>
            </div>
        </div>
        <div className="image">
            {(currentStudio.images === undefined || currentStudio.images === null) ? <></> : <img className="inserted_image" src={currentStudio.images} alt="Pic" />}
        </div>
        <div className="map">
            <Map current={currentStudio} />
        </div>

    </>


}
const center = { lat: 43.6568125, lng: -79.3720985 }



export function Map({ current }) {

    const { studios } = useContext(APIContext);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }), []);
    const location = useGeoLocation();
    // const[directionsResponse,setDirectionsResponse] = useState(null)

    // const originRef = useRef()
    // const destinationRef = useRef()

    useEffect(() => {
    }, [studios])


    return (<>
        {/* {location.loaded ?<Button 
        onClick={()=>calculateRoute(current.latitude,current.longitude,location.coordinates.lat,location.coordinates.lng)}>go
        </Button>:<></>} */}


        <GoogleMap
            zoom={13.5}
            center={center}
            mapContainerClassName="map-container"
            options={options}
        >
            {location.loaded ? <MarkerF icon={image} position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }} /> : <>"Location data not available yet"</>}
            <MarkerF
                position={{ lat: current.latitude, lng: current.longitude }}
            />
            <StudioMarkers />

            {/* {directionsResponse&&<DirectionsRenderer directions={directionsResponse}/>} */}
        </GoogleMap></>
    );
}

export function StudioMarkers() {
    const { studios } = useContext(APIContext);
    useEffect(() => {
    }, [studios])

}
export default StudioDetails;
