import React, {useState, useEffect} from 'react'
import Input from '../components/Input/Input'
import { OUTLINE } from '../components/Input/styles'
import Button from "../components/Button/Button"
import { AUXILIAR, BODY } from '../components/Button/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { login } from '../connect/neo4j'
import { useUserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'



export default function LoginPage() {
  const navigate = useNavigate();
  const methods = useForm();
  const {setUser} = useUserContext();
  const [error, setError] = useState(false);

  const onSubmit = async (data, e)=>{
   const {email, password} = data;
   const result = await login(email, password);
   if(result){
    
    setUser(result);
    console.log(result)
    navigate("/");

   }else{
    setError(true);
   }
  }

  const handleError = ()=>{
    if(error){
      return(
      <p className="text-sm bg-yellow/25 text-yellow font-semibold text-center rounded-full py-1">
      Error en Inicio de Sesion <br/>
      Revise las credenciales para continuar
    </p>)
    }else{
      return <></>
    }
  }
  useEffect(() => {
    if (!error) {
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }, [error]);

  return (
    <div className='flex justify-center'>
    <div className='w-2/5 border-4 border-yellow rounded-2xl my-14 px-10 py-10 flex flex-col justify-center '>
        <h1 className='text-center font-black text-yellow text-4xl mb-8'>Iniciar Sesion</h1>
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
        <Input label="Ingresa tu contraseña" outlined={true}  type="password"
                  name="password"
                  id="password"
                  validation={{
                    required: { value: true, message: "Obligatorio" },
                    minLength: {
                      value: 5,
                      message: "Su clave debe tener al menos 5 caracteres",
                    },
                  }}/>
                  {handleError()}
        <Button style={BODY} display="Iniciar sesion" action={methods.handleSubmit(onSubmit)}/>
        </FormProvider>
        
        <p className='text-black text-center'>o</p>
        <Button style={AUXILIAR} display="Registrarse" to="/register"/>
    </div>
    </div>
  )
}
