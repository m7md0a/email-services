'use client';

import customAxios from '@/axios/customAxios';
import Loading from '@/components/com-small/Loading';
import MessageEmpty from '@/components/com-small/MessageEmpty';
import ContainerApp from '@/components/customize/ContainerApp';
import IsNotUser from '@/components/gard-route/IsNotUser';
import { IMessageResult } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = { 
    params: {
        id: string
    }
}

function page({ params }:  Props) {
    const {id} = params;

    const router = useRouter();
    if (router.isFallback) {
        <h1>Data is loading</h1>;
    }


    const [msg, setMsg] = useState<IMessageResult>()
    const [error, setError] = useState<string|null>();

    async function getMessage(id:string){
        try {
            
            let res = await customAxios().get(`messages/${id}`)
            if (res.status === 200) {
                setMsg(res.data)
                let r = await customAxios().patch(`messages/${id}`, {
                    seen:true
                })
            }
        } catch (error:any) {
            if (error.message === "Request failed with status code 404") {
                setError(error.response.data.detail)
            }
        }
    }
    useEffect(() => {
        getMessage(id)
    }, [id])
    
  return msg ? (
    <ContainerApp className="pt-4 min-h-[83vh]">
        <div className='card bg-base-100 text-base-content/80 shadow'>
            <div className="card-body px-0">
                <div className="card-actions justify-between p-3 md:p-4">
                    <div className="flex text-sm space-x-2">
                        <div className={`avatar ${!msg.seen && "online"} placeholder`}>
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span className="text-xl">{msg.from.name[0]+msg.from.name[1]}</span>
                            </div>
                        </div>
                        <p className="flex flex-col">
                            <span className="">{msg.from.name}</span> 
                            <span className="text-xs">{msg.from.address}</span>
                        </p>
                    </div>
                    <Link href="/" className="btn btn-square btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </Link>
                </div>
                <p className="text-xs px-5">{msg.subject}</p>
                <div className='overflow-scroll md:overflow-auto px-4'>
                    <p className="w-[200vw] md:w-auto message" dangerouslySetInnerHTML={{ __html: msg.html }}></p>
                </div>
            </div>
        </div>
    </ContainerApp>
  ) : <MessageEmpty msg="Not found message!"/>
}

export default IsNotUser(page)