import { Footer } from '@components/footer'
import { HeaderDefaultCheckout } from '@components/headers/header-default-checkout'
import { Outlet } from 'react-router-dom'

export function DefaultLayoutCheckout() {
  return (
    // <div className='relative'>
    <>
      <div className="min-h-screen pt-20 mb-8">
        <HeaderDefaultCheckout />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
