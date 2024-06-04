import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form';
import {MuiButton} from '../components/materialui/MuiButton'
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import UserContext from '../context/UserContext';

const schema = z.object({
  name: z.string().min(3).nonempty("Name is required"),
  username: z.string().min(6).nonempty("Username is required"),
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(6).max(20).nonempty("Password is required"),
  confirmPassword: z.string().min(6).max(20).nonempty("Password is required"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ["confirmPassword"]
    });
  }
});


const Register = () => {
  const {register,handleSubmit, formState} = useForm({resolver:zodResolver(schema)})
  const {errors} = formState
  const [err,setErr] = useState(null)
  const {registerUser} = useContext(UserContext)

  const handleSave = async (formValues) => {
    setErr(null)
    registerUser(formValues).then((res)=>{
      if(res){
        setErr(res.message)
      }
    })
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover' alt="" src='https://wallpaper.dog/large/5543708.jpg'/>
        <div className='absolute bg-black/60 top-0 left-0 w-full h-full'></div>
        <div className='fixed w-full px-4 py-24 z-50 mt-10'>
          <div className='max-w-[450px]  mx-auto bg-black/80 text-white rounded'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>REGISTER</h1>
              <form onSubmit={handleSubmit(handleSave)} className='w-full flex flex-col py-4'>
                <input {...register('name')} className='p-3 my-2 bg-gray-700 rounded' type="text" placeholder='Full Name' autoComplete='off'/>
                <small>{errors.name?.message}</small>
                <input {...register('username')} className='p-3 my-2 bg-gray-700 rounded' type="text" placeholder='Username' name='username' autoComplete='off'/>
                <small>{errors.username?.message}</small>
                <input {...register('email')} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' name='email' autoComplete='email'/>
                <small>{errors.email?.message}</small>
                <input {...register('password')} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' name='password' autoComplete='off'/>
                <small>{errors.password?.message}</small>
                <input {...register('confirmPassword')} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Confirm Password' name='confirmPassword' autoComplete='off'/>
                <small>{errors.confirmPassword?.message}</small>
                <MuiButton type='submit'>Register</MuiButton>
                <small>{err ? err : ""}</small>    
                <p className='py-4'>
                  <span className="text-gray-600 pr-2">Already registered to Meowie?</span>
                  <Link to="/login">
                  Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Register
