import React, { useEffect, useState } from 'react'
import Input from '../components/Input/Input'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY } from '../components/Button/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../context/UserContext";
import { register } from '../connect/neo4j'


export default function RegisterPage() {
  const navigate = useNavigate();
  const methods = useForm();
  const {setUser} = useUserContext();
  const [error, setError] =useState(null);

  
  const onSubmit = async(data)=>{
    const {email, password, username} = data;
    const result = await register(email, password, username);
    if(result.message){
      setError(result.message)
      console.log(result.message)
    }else{
      
      setUser(result);
      navigate("/");
    }
  }
  const handleError =()=>{
    if(error){
      switch (error) {
        case 'email already exists':
          return(
            <p className="text-sm bg-yellow/25 text-yellow font-semibold text-center rounded-full py-1">
            Ya existe una cuenta con este correo
          </p>)
          break;
        case 'username already exists':
          return(
            <p className="text-sm bg-yellow/25 text-yellow font-semibold text-center rounded-full py-1">
            Ya existe ese usuario
          </p>)

          break;
        default:
          break;
      }
    }else{
      return <></>
    }
  }
  useEffect(()=>{if (!error) {
    setTimeout(() => {
      setError(null);
    }, 10000);
  }},[error])
  return (
    <div className='flex justify-center'>
    <div className='w-2/5 border-4 border-yellow rounded-2xl my-14 px-10 py-10 flex flex-col justify-center '>
        <h1 className='text-center font-black text-yellow text-4xl mb-8'>Registrarse</h1>
        <FormProvider {...methods}>

        <Input label="Ingresa tu correo" outlined={true} type="email"
                    name="email"
                    id="email"
                    validation={{
                      required: { value: true, message: "Obligatorio" },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Por favor, introduzca un correo valido",
                      },
                    }}/>
        <Input label="Ingresa tu contraseña" outlined={true} type="text"
                    name="password"
                    id="password"
                    validation={{
                      required: { value: true, message: "Obligatorio" },
                      minLength: {
                        value: 5,
                        message: "Su clave debe tener al menos 5 caracteres",
                      },
                    }}/>
        <Input label="Ingresa tu usuario" outlined={true} type="text"
                    name="username"
                    id="username"
                    validation={{
                      required: { value: true, message: "Obligatorio" },
                     
                    }}/>
        {handleError()}
        <Button style={BODY} display="Crear usuario" action={methods.handleSubmit(onSubmit)}/>
        </FormProvider>
        <p className='text-black text-center'>Ya tienes cuenta?</p>
        <Button style={AUXILIAR} display="Iniciar Sesion" to="/login"/>
    </div>
    </div>
  )
}
