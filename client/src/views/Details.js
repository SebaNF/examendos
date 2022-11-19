import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { simpleDelete, simpleGet, simplePut } from '../services/pets.services';

const Details = () => {

    const {id} = useParams();
    const [pet, setPet] = useState();
    const navigate = useNavigate();
    const [likes, setLikes] = useState();
    const [button, setButton] = useState(false);

    const getPet = async () => {
        try {
            const response = await simpleGet(`http://localhost:8000/api/pets/${id}`);
            console.log(response.data.pet);
            setPet(response.data.pet);
            setLikes(response.data.pet.likes)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPet();
    }, []);

    const deletePet = async() =>{
        try{
            const response = await simpleDelete(`http://localhost:8000/api/pets/${id}`);
            console.log(response);
            navigate('/');
        }catch(err){
            console.log(err)
        }
    };
    
    const updatePetLikes = async () => {
        const addlikes = {
            likes: likes + 1
        }
        try {
            const response = await simplePut(`http://localhost:8000/api/pets/${id}`, addlikes);
            console.log(response.data);
            setLikes(likes+1);
            setButton(true);
        } catch (err) {
            console.log(err);
        };
    };
    
    return (
        <div>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/')}>Volver a Home</button>
            </div>
            <div className='details-header'>
            <h3>Detalles sobre: {pet?.name}</h3>
            <button type="button" className="btn btn-danger" onClick={()=>deletePet()}>Adoptar Esta Mascota</button>
            </div>
            <div className='details'>
                <div className='sub-detail-tipo'>
                    <h4>Tipo mascota:</h4>
                    <h4>{pet?.type}</h4>
                </div>
                <div className='sub-detail'>
                    <h4>Descripción:</h4>
                    <h4>{pet?.description}</h4>                   
                </div>
                <div className='sub-detail'>
                    <h4> Habilidades:</h4> 
                    <div>
                        <h4>{pet?.skills[0]}</h4> 
                        <h4>{pet?.skills[1]}</h4> 
                        <h4>{pet?.skills[2]}</h4>
                    </div>
                </div>
                <div className='likes'>
                    <button type="button" className="btn btn-success shadow" onClick={updatePetLikes} disabled={button}>Like {pet?.name}</button>
                    <h4>{likes} like(s)</h4>
                </div>
            </div>
        </div>
    );
}

export default Details;
