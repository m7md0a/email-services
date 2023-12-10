import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect } from 'react'

function isUser(Component: any) {
  return function Gard(props: any){
    const {user} = useAppSelector(state=> state.auth);
    useLayoutEffect(()=>{
        if (user) {
            redirect('/')  
        }
    }, [user])
    if (user) {
        return null
    }
    return <Component {...props}/>
  }
}

export default isUser