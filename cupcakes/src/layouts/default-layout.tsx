import { HeaderDefault } from "@components/headers/header-default"
import { Outlet } from "react-router-dom"

export function DefaultLayout() {
  return (
    <div className="w-full max-w-[70rem] mx-auto">
      <HeaderDefault/>
      <Outlet />
      {/* Footer */}
    </div>
  )
}
