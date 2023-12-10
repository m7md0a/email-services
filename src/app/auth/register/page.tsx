'use client';

import Link from 'next/link';
import Input from '../../../components/form/Input'
import React, { useEffect, useState } from 'react'
import customAxios from '@/axios/customAxios';
import { useRouter } from 'next/navigation'
import isUser from '@/components/gard-route/isUser';
import { domainType } from '@/types';



function page() {
    const [address, setAddress] = useState<string>('');
    const [domains, setDomains] = useState<domainType[]>();
    const [domain, setDomain] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string|null>();
    const router = useRouter()
    
    
    async function getDomains(){
        try {
            let res = await customAxios().get('domains')
            setDomains(res.data["hydra:member"])
            setDomain(res.data["hydra:member"][0].domain)
            setError(null)
        } catch (error:any) {
            console.log(error)
        }
      }

    async function createUser(address: string, password: string){
        try {
            let res = await customAxios().post('accounts', {
                address : address+"@"+domain,
                password
                })
                setError(null)
                router.push(`/auth/login?email=${res.data.address}&pass=${password}`)
        } catch (error:any) {
            console.log(error.response);
            setError(error)
        }
    }

    const randomUser = () => {
        const email = Math.random().toString(36).substring(2, 12);
        const password = Math.random().toString(36).substring(2, 10);
        createUser(email, password);
    }

    const handelRegister = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUser(address, password);
    }

    useEffect(() => {        
        getDomains();
    }, [])
  return (
    <div>
        <div className="relative flex flex-col justify-center min-h-[83vh] overflow-hidden">
            <div className="w-full p-6 m-auto bg-base-300 text-neutral-content rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary">Register</h1>
                <form className="space-y-4 mt-5" onSubmit={handelRegister}>
                    {error && <div className='alert py-2 px-4 alert-warning'>{error}</div>}
                    <div className="join col-span-2">
                        <Input type="text" classInput="join-item rounded-r-none" placeholder={'Address'} auth setData={setAddress}/>
                        {domains && <select className="select select-bordered join-item text-primary" onChange={(e) => setDomain(e.target.value)}>
                            {domains.map((domain: domainType) => <option key={domain.id} value={domain.domain}>{domain.domain}</option>)}
                        </select>}
                    </div>
                    <Input type="password" className="col-span-2" placeholder={'Password'} auth setData={setPassword}/>
                    <div className='flex justify-center py-2'>
                        <button className='btn btn-primary w-full min-w-xs'>Register</button>
                    </div>
                    <Link href="/auth/login" className="text-base-content hover:underline hover:text-primary py-2">You have account ?</Link>
                </form>
                <div className='flex justify-center py-2'>
                    <button onClick={randomUser} className='btn hover:btn-primary w-full min-w-xs'>Random User</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default isUser(page)