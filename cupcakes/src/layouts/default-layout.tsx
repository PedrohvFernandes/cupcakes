import { Outlet } from "react-router-dom"

export function DefaultLayout() {
  return (
    <div className="w-full max-w-[70rem] mx-auto">
      {/* <HederDefault/> */}
      <Outlet />
      {/* Footer */}
    </div>
  )
}
