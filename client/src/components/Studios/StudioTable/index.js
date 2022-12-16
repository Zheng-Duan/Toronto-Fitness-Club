import { useContext } from "react";
import { APIContext } from "../../../Contexts/APIContext.js";
import './style.css';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const StudiosTable = ({ perPage, params }) => {
    const { studios } = useContext(APIContext);

    return <Table striped className="table">
        <thead>
            <tr className='r'>
                <th> Pin# </th>
                <th> Studio Name </th>
                <th> Address </th>
                <th> Classes </th>
            </tr>
        </thead>
        <tbody>
            {studios.map((studio, index) => (
                <tr className='r' key={studio.name}>
                    <td>{index+1}</td>
                    <td>{studio.name}</td>
                    <td>{studio.address}</td>
                    <td><Link to={`/class/${studio.name}`}><Button type="button" variant="outline-danger">Classes</Button></Link></td>
                </tr>
            ))}
        </tbody>
    </Table>
}

export default StudiosTable;