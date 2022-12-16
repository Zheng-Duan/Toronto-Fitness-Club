import React, { useMemo, useContext, useEffect } from 'react'
import './style.css'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import useGeoLocation from './UseGeoLocation'
import APIContext from '../../Contexts/APIContext'
import { useNavigate  } from 'react-router-dom'
const image =
    "http://earth.google.com/images/kml-icons/track-directional/track-0.png";

export default function StudioMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    if (!isLoaded) return <div>Loading...</div>
    return (<>
        <div className='container'>
            <Map />
        </div>
    </>);
}
const center = { lat: 43.6568125, lng: -79.3720985 }


export function Map() {
    const { studios } = useContext(APIContext);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }), []);
    const location = useGeoLocation();
    useEffect(() => {
    }, [studios])


    let navigate = useNavigate();
    const routeChange = (name) => {
        console.log(`/studio/${name}`)
        let path = `/studio/${name}`;
        navigate(path);
    }

    return (<GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        options={options}
    >
        {location.loaded ? <MarkerF icon={image} position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }} /> : "Location data not available yet"}

        {studios[0] !== undefined ? <MarkerF
            onClick={() => routeChange(studios[0].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|FE6256|000000'
            position={{ lat: studios[0].latitude, lng: studios[0].longitude }} /> : <></>}
        {studios[1] !== undefined ? <MarkerF 
            onClick={() => routeChange(studios[1].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|FE6256|000000'
            position={{ lat: studios[1].latitude, lng: studios[1].longitude }} /> : <></>}
        {studios[2] !== undefined ? <MarkerF 
            onClick={() => routeChange(studios[2].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|FE6256|000000'
            position={{ lat: studios[2].latitude, lng: studios[2].longitude }} /> : <></>}
        {studios[3] !== undefined ? <MarkerF 
            onClick={() => routeChange(studios[3].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=4|FE6256|000000'
            position={{ lat: studios[3].latitude, lng: studios[3].longitude }} /> : <></>}
        {studios[4] !== undefined ? <MarkerF 
            onClick={() => routeChange(studios[4].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=5|FE6256|000000'
            position={{ lat: studios[4].latitude, lng: studios[4].longitude }} /> : <></>}
        {studios[5] !== undefined ? <MarkerF 
            onClick={() => routeChange(studios[5].name)}
            icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=6|FE6256|000000'
            position={{ lat: studios[5].latitude, lng: studios[5].longitude }} /> : <></>}

        <StudioMarkers />
        {/* <GetDirections/> */}
    </GoogleMap>
    );
}

export function StudioMarkers() {
    const { studios } = useContext(APIContext);
    useEffect(() => {

    }, [studios])

}