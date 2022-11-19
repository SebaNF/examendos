import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from "yup";

const PetsForm = (props) => {

    const {name, type, description, skill1, skill2, skill3, onSubmitProp, btnText} = props;
    
    return (
        <div>
            <Formik
                initialValues={{
                    name: name,
                    type: type,
                    description: description,
                    skill1: skill1,
                    skill2: skill2,
                    skill3: skill3,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup
                        .string()
                        .required("Por favor ingrese el nombre de la mascota")
                        .min(3, "Nombre debe tener al menos 3 caracteres"),
                    type: Yup
                        .string()
                        .required("Por favor ingrese un tipo")
                        .min(3, "Tipo debe tener al menos 3 caracteres"),
                    description: Yup
                        .string()
                        .required("Por favor ingrese una descripción")
                        .min(3, "Descripción debe tener al menos 3 caracteres"),
                    skill1: Yup.string(),
                    skill2: Yup.string(),
                    skill3: Yup.string()

                })}
                onSubmit={(values, { setSubmitting }) => {
                    onSubmitProp(values);
                }}
            >
                {({ errors, touched, handleSubmit }) => {
                    return (
                    <div>
                        <Form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="name">Nombre</label>
                                        <Field id="name" type="text" name="name" className="form-control" />
                                        {errors.name && touched.name && <p className='error-validation' >{errors.name}</p>}

                                        <label htmlFor="type">Tipo</label>
                                        <Field id="type" type="text" name="type" className="form-control" />
                                        {errors.type && touched.type && <p className='error-validation'>{errors.type}</p>}

                                        <label htmlFor="description">Descripción</label>
                                        <Field id="description" type="text" as="textarea" name="description" className="form-control" />
                                        {errors.description && touched.description && <p className='error-validation'>{errors.description}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <h4>Habilidades (Opcionales)</h4>
                                        <label htmlFor="skill1">habilidad 1</label>
                                        <Field id="skill1" type="text" name="skill1" className="form-control" />
                                        {errors.skill1 && touched.skill1 && <p className='error-validation'>{errors.skill1}</p>}

                                        <label htmlFor="skill2">habilidad 2</label>
                                        <Field id="skill2" type="text" name="skill2" className="form-control" />
                                        {errors.skill2 && touched.skill2 && <p className='error-validation'>{errors.skill2}</p>}

                                        <label htmlFor="skill3">habilidad 3</label>
                                        <Field id="skill3" type="text"  name="skill3" className="form-control" />
                                        {errors.skill3 && touched.skill3 && <p className='error-validation'>{errors.skill3}</p>}
                                    </div>
                                    
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={Object.values(errors).length > 0 || Object.values(touched).length === 0}>{btnText}</button>
                            </div>
                        </Form>
                    </div>)
                }}

            </Formik>
        </div>
    );
}

export default PetsForm;
