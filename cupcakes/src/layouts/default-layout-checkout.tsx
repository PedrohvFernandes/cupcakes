import { HeaderDefaultCheckout } from "@components/headers/header-default-checkout"
import { Outlet } from "react-router-dom"

export function DefaultLayoutCheckout() {
  return (
    <div className="w-full max-w-[70rem] mx-auto">
      <HeaderDefaultCheckout/>
      <Outlet />
      {/* Footer */}
    </div>
  )
}
