import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../Contexts/APIContext";
import StudiosTable from "./StudioTable";
import './style.css';
import useGeoLocation from "../StudioMap/UseGeoLocation";
import StudioMap, { Map } from "../StudioMap";
import Button from 'react-bootstrap/Button';

const Studios = () => {

    const perPage = 6;
    const [params, setParams] = useState({ page: 1, search: "" })
    const { setStudios } = useContext(APIContext);
    const [totalPages, setTotalPages] = useState(1)
    const location = useGeoLocation();
    useEffect(() => {
        if (location.coordinates !== undefined) {
            fetch(`http://127.0.0.1:8000/studios/${location.coordinates.lat},${location.coordinates.lng}/?offset=${6 * (params.page - 1)}&search=${params.search}`)
                .then(response => response.json())
                .then(json => {
                    setStudios(json.results)
                    setTotalPages(json.count)
                })
        }


    }, [params, location])

    return (
        <>
        <br/>
            <div className="black-border subheader">
                <h1 id="studio-header">Find a Studio</h1><br />

                <div class="input-group w-50 search-bar black-border">

                    <input type="text" className="form-control" placeholder="You can search from studio name, amenities, class name, and coaches"
                        aria-describedby="basic-addon2"
                        value={params.search}
                        onChange={(event) => {
                            setParams({
                                search: event.target.value,
                                page: 1,
                            })
                        }} />
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Search</span>
                    </div>
                </div>
            </div>

            <div className='row black-border px-3'>
                <div className='col-3 black-border'>
                    <StudiosTable perPage={perPage} params={params} />
                    {params.page > 1 ? <Button variant="dark" onClick={() => setParams({
                        ...params,
                        page: Math.max(1, params.page - 1)
                    })}>
                        previous
                    </Button> : <Button variant="dark" disabled>previous</Button>}
                    {params.page < totalPages / 6 ? <Button variant="dark" onClick={() => setParams({
                        ...params,
                        page: params.page + 1
                    })}>
                        next
                    </Button> : <Button variant="dark" disabled>next</Button>}
                </div>
                <div className='col black-border map-div'><StudioMap /></div>
            </div>


        </>
    )
}

export default Studios;