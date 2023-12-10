import { IMessageResult } from '@/types'
import Link from 'next/link'
import React from 'react'

type Props = {
    msg: IMessageResult;
    method: (id:string) => Promise<void>
}

function IntroMessage({msg, method}: Props) {
  return (
    <div className={`card  ${msg.seen ? 'bg-base-300 text-gray-600 ' : 'bg-primary text-gray-200'} shadow`}>
        <div className="card-body p-4">
            <div className="flex justify-between">
                <Link href={`message/${msg.id}`} className="flex space-x-5 md:w-1/4">
                    <div className={`avatar placeholder w-10 h-10`}>
                        <div className="bg-neutral text-neutral-content rounded-full">
                        <span className="text-base md:text-xl">{msg.from.name[0]+msg.from.name[1]}</span>
                        </div>
                    </div>
                    <p className="flex flex-col">
                        <span className="text-xs md:text-base font-medium">{msg.from.name}</span> 
                        <span className="text-xs text-gray-400">{msg.from.address}</span>
                    </p>
                </Link>
                <Link href={`message/${msg.id}`} className='hidden md:block pr-7'>
                    <div className="w-full text-center">{msg.subject}</div>
                    <div className="w-full text-center line-clamp-1">{msg.intro}</div>
                </Link>
                <div>
                <button onClick={() => method(msg.id)} className="btn btn-square btn-error btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-content">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IntroMessage