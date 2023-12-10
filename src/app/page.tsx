"use client"

import customAxios from "@/axios/customAxios";
import Loading from "@/components/com-small/Loading";
import MessageEmpty from "@/components/com-small/MessageEmpty";
import ContainerApp from "@/components/customize/ContainerApp";
import IsNotUser from "@/components/gard-route/IsNotUser";
import IntroMessage from "@/components/messages/IntroMessage";
import { useAppSelector } from "@/redux/store";
import { IMessageResult } from "@/types";
import { useEffect, useState } from "react"

function Home() {
  const [msgs, setMsgs] = useState<IMessageResult[]>([])
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {user} = useAppSelector(state => state.auth)

  async function getMessages(){
    try {
      let res = await customAxios().get('messages')
      if (res.status === 200) {
        setMsgs(res.data["hydra:member"])
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessages(id:string){
    try {
      await customAxios().delete(`messages/${id}`)
      setRefresh(value => !value)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (user) {
      getMessages()      
    }
  }, [refresh])
  

  const icon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-content">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>)
  return (
    <div className="dark:bg-red-800 flex">
      <section className="w-16 md:w-48 min-h-[92vh] border-r border-base-200 md:p-4">
        <ul className="menu menu-xs space-y-3 md:menu-md px-2">
          {/* <button className="btn btn-sm justify-between">
            <span className="hidden md:block">Inbox</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
          </button> */}
          <button className="btn btn-sm justify-between" onClick={() => setRefresh(value => !value)}>
            <span className="hidden md:block">Refresh</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </ul>
      </section>
      <section className="space-y-3 p-3 md:p-8 w-full">
        <div className="flex flex-col md:flex-row gap-3 md:space-x-0 md:w-2/4">
          <span>Email: <code className="text-sm text-gray-400 badge badge-lg ">{user?.address}</code></span>
          <span>Password: <code onClick={() => setShowPassword(value => !value)} className="text-gray-400 badge badge-lg">{showPassword ? user?.password  : "*********"}</code></span>
        </div>
        <h3 className="text-xl text-primary">Index</h3>
        {msgs ? msgs.length > 0 ? msgs.map((msg : IMessageResult) => {
          return <IntroMessage key={msg.id} msg={msg} method={deleteMessages} />
        }) : <MessageEmpty msg="Messages is empty yet!" /> : <Loading />}  
       </section>

    </div>
  )
}

export default IsNotUser(Home)