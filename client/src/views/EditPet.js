import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PetsForm from '../components/PetsForm';
import { simpleGet, simplePut } from '../services/pets.services';

const EditPet = () => {

    const {id} = useParams();
    const [pet, setPet] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const getPet = async () => {
        try {
            const response = await simpleGet(`http://localhost:8000/api/pets/${id}`);
            console.log(response.data.pet)
            setPet(response.data.pet);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getPet();
    }, []);

    const editPet= async(values)=>{
        values.skills = [values.skill1, values.skill2, values.skill3];
        if(values.name && values.type){
            values.name = values.name[0].toUpperCase()+values.name.substring(1)
            values.type= values.type[0].toUpperCase()+values.type.substring(1)
        }
        try{
            const response = await simplePut(`http://localhost:8000/api/pets/${id}`,values)
            console.log(response)
            if(response.data.message !== ""){
                console.log("ERRORES", response.data);
                const errorResponse = response.data.error;
                console.log("Object keys", Object.keys(errorResponse));
                const errorArr = [];
            for (const llave of Object.keys(errorResponse)) {
                console.log(errorResponse[llave]);
                errorArr.push(errorResponse[llave].message);
            }
        setErrors(errorArr);
                
            }else{
                navigate('/')
            }
            
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/')}>Volver a Home</button>
            </div>
            <h2>Editar: {pet?.name}</h2>
            {pet && <PetsForm name={pet.name} type={pet.type} description={pet.description} skill1={pet.skills[0]} skill2={pet.skills[1]} skill3={pet.skills[2]} onSubmitProp={editPet} btnText={"Editar Mascota"} />}
            {errors?.map((error,index)=><p className='error-validation2' key={index}>{error}</p>)}
        </div>
    );
}

export default EditPet;
