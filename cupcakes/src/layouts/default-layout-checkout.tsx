import { Footer } from '@components/footer'
import { HeaderDefaultCheckout } from '@components/headers/header-default-checkout'
import { Outlet } from 'react-router-dom'

export function DefaultLayoutCheckout() {
  return (
    <div className='relative'>
      <div className="w-full max-w-[70rem] mx-auto min-h-screen">
        <HeaderDefaultCheckout />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
