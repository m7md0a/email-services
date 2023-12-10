'use client';

import Link from 'next/link';
import Input from '../../../components/form/Input'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slice/authSlice';
import customAxios from '@/axios/customAxios';
import { useSearchParams } from 'next/navigation';
import isUser from '@/components/gard-route/isUser';

function page() {
    const emailParams = useSearchParams().get('email')
    const passwordParams = useSearchParams().get('pass')
    const [address, setAddress] = useState<string>(emailParams || '');;
    const [password, setPassword] = useState<string>(passwordParams || '');
    const [error, setError] = useState<string|null>();
    const dispatch = useDispatch();
    
    async function getUser(address: string, password: string){
        try {
            let res = await customAxios().post('token', {
                address,
                password
              })
              dispatch(login({...res.data, address, password}))
              setError(null)
        } catch (error:any) {
            if (error.response.status === 401) {
                setError("The email or password is not correct")
            }
        }
      }
    const handelLogin = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getUser(address, password)
    }
    useEffect(() => {
        if (emailParams && passwordParams) {
            getUser(emailParams, passwordParams);
        }
    }, [])
    
    
  return (
    <div>
        <div className="relative flex flex-col justify-center min-h-[83vh] overflow-hidden">
            <div className="w-full p-6 m-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary">Login</h1>
                <form className="space-y-4 mt-5" onSubmit={handelLogin}>
                    {error && <div className='alert py-2 px-4 alert-warning'>{error}</div>}
                    {emailParams ? <div className='alert'>{emailParams}</div> : <Input label="Email" type="email" className="col-span-2" placeholder={'Email'} auth setData={setAddress}/>}
                    {passwordParams ? <div className='alert'>{passwordParams}</div>  :<Input label="Password" type="password" className="col-span-2" placeholder={'Password'} auth setData={setPassword}/>}
                    <div className='flex justify-center py-2'>
                        <button className='btn btn-primary w-full min-w-xs'>Login</button>
                    </div>
                    <Link href="/auth/register" className="text-base-content hover:underline hover:text-primary">Create Account ?</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default isUser(page)