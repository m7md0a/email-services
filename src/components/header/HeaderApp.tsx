'use client'

import { logout } from '@/redux/slice/authSlice'
import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function HeaderApp() {

  const {user} = useAppSelector(state => state.auth)
  const dispatch = useDispatch()
  const [theme, setTheme] = useState<string | null>(()=>{
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('theme')
    }
    return null
  })
  const logoutApp = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout())
  }



  const Links = () => {
    return <>
          {user ?
              <>
                <li><Link className='' href="/">Home</Link></li>
                <li>
                  <button onClick={logoutApp}>Logout</button>
                </li>
                </> : <>
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
                <li>
                  <Link href="/auth/register">Reister</Link>
                </li>
              </>}
    </>
  }
  
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme("light")
      localStorage.removeItem('theme')
    }
    else {
      setTheme("dark")
      localStorage.setItem('theme', "dark")
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || '')
  }, [theme])
  
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div className="flex justify-center items-center space-x-2">
              <h1 className='text-lg'>Email services</h1>
            </div>
            {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
              <Links />
            </ul> */}
          </div>
        </div>
        <div className="navbar-center md:navbar-end">
          <ul className="menu menu-sm menu-horizontal px-1">
              <Links />
            <li>
              <button className='' onClick={() => toggleTheme()}>
                {theme === 'dark' ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-warning">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                }
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HeaderApp