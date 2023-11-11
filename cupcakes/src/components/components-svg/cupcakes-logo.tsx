import { useNavigate } from 'react-router-dom'

import { CupcakesLogoSVG } from '@assets/index'
import { ConfigRoutes } from '@config/index'

export function CupcakesLogo() {
  const navigate = useNavigate()

  return (
    <CupcakesLogoSVG
      onClick={() => navigate(ConfigRoutes.cupcakes.default.source)}
      className='cursor-pointer'
    />
  )
}
