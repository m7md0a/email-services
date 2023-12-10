import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect } from 'react'

function IsNotUser(Component: any) {
  return function WithAuth(props: any){
    const {user} = useAppSelector(state=> state.auth);
    useLayoutEffect(()=>{
        if (!user) {
            redirect('/auth/login')  
        }
    }, [!user])
    if (!user) {
        return null
    }
    return <Component {...props}/>
  }
}

export default IsNotUser