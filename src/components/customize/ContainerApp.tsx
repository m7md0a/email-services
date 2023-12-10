import React from 'react'

type PropsType = {
  className?: string,
  children: React.ReactNode
}
export default function ContainerApp(props: PropsType) {
  return (
    <section className={`max-w-7xl mx-auto px-8 ${props.className}`}>{props.children}</section>
  )
}
