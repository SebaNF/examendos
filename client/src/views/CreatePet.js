import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetsForm from '../components/PetsForm';
import { simplePost } from '../services/pets.services';

const CreatePet = () => {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createPet = async(values) =>{
        values.skills = [values.skill1, values.skill2, values.skill3];
        if(values.name && values.type){
            values.name = values.name[0].toUpperCase()+values.name.substring(1)
            values.type= values.type[0].toUpperCase()+values.type.substring(1)
        }
        try{
            
            const response = await simplePost('http://localhost:8000/api/pets',values)
            if(response.data.message !== "" ){
                const errorResponse = response.data.error;
                const errorArr = [];
                for (const llave of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[llave].message);
            }
            setErrors(errorArr);
                
            }else{
                navigate('/');
            };
            
        }catch(err){
            console.log(err);
        };
    };

    return (
        <div>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <button type="button" className="btn btn-link" onClick={()=>navigate('/')}>Volver a Home</button>
            </div>
            <h2>¿Conoces una mascota que necesite hogar?</h2>
            <div className='form-error-div'>
                <PetsForm name="" type="" description="" skill1="" skill2="" skill3="" onSubmitProp={createPet} btnText={"Agregar Mascota"}/>
                {errors?.map((error,index)=><p className='error-validation2' key={index}>{error}</p>)}
            </div>
        </div>
    );
}

export default CreatePet;
