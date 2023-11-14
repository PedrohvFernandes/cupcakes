import { Footer } from '@components/footer'
import { HeaderDefault } from '@components/headers/header-default'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    // <div className='relative'>
    <>
      {/* <div className="container"> */}
      {/* <div className="w-full max-w-[70rem] mx-auto min-h-screen pt-20"> */}
      <div className="min-h-screen pt-20">
        <HeaderDefault />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
