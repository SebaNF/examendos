import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simpleGet } from '../services/pets.services';

const Main = () => {

    const [pets, setPets] = useState();
    const navigate = useNavigate();

    const getPets = async() =>{
        try{
            const response = await simpleGet('http://localhost:8000/api/pets')
            console.log(response.data.pets)
            setPets(response.data.pets);
            
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getPets();
    }, []);

    return (
        <div>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/pets/new')}>Agregar una mascota al refugio</button>
            </div>
            <h2>Todas estas mascotas buscan un buen hogar</h2>
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Nombre mascota</th>
                        <th>Tipo mascota</th>
                        <th>Acciones</th>                         
                    </tr>
                </thead>
                <tbody>
                    {pets?.map((pet)=>
                    <tr key={pet._id}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td>
                            <div className='actions-button'>
                                <button id="details-btn"  type="button" className="btn btn-link"onClick={()=>navigate(`/pets/${pet._id}`)}>Detalles</button> 
                                <button type="button" className="btn btn-link"onClick={()=>navigate(`/pets/${pet._id}/edit`)}>Editar</button>
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Main;
