import { useNavigate } from 'react-router-dom'

import { CupcakesLogoSVGVertical } from '@assets/logo/index'
import { ConfigRoutes } from '@config/index'

export function CupcakesLogo() {
  const navigate = useNavigate()

  return (
    <CupcakesLogoSVGVertical
      onClick={() => navigate(ConfigRoutes.cupcakes.default.source.path)}
      className='cursor-pointer w-28 sm:w-36  md:w-52'
    />
  )
}
