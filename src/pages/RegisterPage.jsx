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
            There is an existing account with the entered email
          </p>)
          break;
        case 'username already exists':
          return(
            <p className="text-sm bg-yellow/25 text-yellow font-semibold text-center rounded-full py-1">
            There is an existing acount with the entered username 
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
        <h1 className='text-center font-black text-yellow text-4xl mb-8'>Sign Up</h1>
        <FormProvider {...methods}>

        <Input label="Enter your email" outlined={true} type="email"
                    name="email"
                    id="email"
                    validation={{
                      required: { value: true, message: "Required" },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Please enter a valid email",
                      },
                    }}/>
        <Input label="Enter your password" outlined={true} type="text"
                    name="password"
                    id="password"
                    validation={{
                      required: { value: true, message: "Required" },
                      minLength: {
                        value: 5,
                        message: "Your password must have at least 5 characters",
                      },
                    }}/>
        <Input label="Enter your username" outlined={true} type="text"
                    name="username"
                    id="username"
                    validation={{
                      required: { value: true, message: "Required" },
                     
                    }}/>
        {handleError()}
        <Button style={BODY} display="Create user" action={methods.handleSubmit(onSubmit)}/>
        </FormProvider>
        <p className='text-black text-center'>Already have an account?</p>
        <Button style={AUXILIAR} display="Log In" to="/login"/>
    </div>
    </div>
  )
}
